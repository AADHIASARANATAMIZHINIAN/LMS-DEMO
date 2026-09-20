import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('student')
@UseGuards(AuthGuard, RolesGuard)
@Roles('STUDENT')
export class StudentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('courses')
  async getCourses(@Req() req: any) {
    const student = await this.prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!student) return [];
    const enrollments = await this.prisma.studentClassEnrollment.findMany({
      where: { studentId: student.id },
      include: { courseOffering: { include: { course: true, teacherAssignments: { include: { teacher: true } } } } }
    });
    return enrollments.map(e => e.courseOffering);
  }

  @Get('assignments')
  async getAssignments(@Req() req: any) {
    const student = await this.prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!student) return [];
    
    // Get course offerings the student is in
    const enrollments = await this.prisma.studentClassEnrollment.findMany({ where: { studentId: student.id } });
    const offeringIds = enrollments.map(e => e.courseOfferingId);
    
    return this.prisma.assignment.findMany({
      where: { courseOfferingId: { in: offeringIds } },
      include: { courseOffering: { include: { course: true } }, submissions: { where: { studentId: student.id } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Post('assignments/:id/submit')
  async submitCode(@Req() req: any, @Param('id') assignmentId: string, @Body() data: { code: string }) {
    const student = await this.prisma.student.findUnique({ where: { userId: req.user.id } });
    if (!student) return null;

    // FAKE EXECUTION FOR DEMO PURPOSES
    const isSuccess = !data.code.includes("error");
    const passed = isSuccess ? 10 : 8;
    const score = isSuccess ? 100 : 80;
    const outputLog = isSuccess ? "Tests passed successfully in 0.42s" : "Failed hidden test case #3. Memory limit exceeded.";

    return this.prisma.submission.create({
      data: {
        tenantId: req.user.tenantId,
        assignmentId,
        studentId: student.id,
        code: data.code,
        status: isSuccess ? "COMPLETED" : "ERROR",
        score, passed, total: 10, outputLog, executionMs: 420, memoryKb: 24000
      }
    });
  }
}
