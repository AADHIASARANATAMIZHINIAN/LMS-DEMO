import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('teacher')
@UseGuards(AuthGuard, RolesGuard)
@Roles('TEACHER', 'COORDINATOR')
export class TeacherController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('classes')
  async getClasses(@Req() req: any) {
    const user = req.user;
    const teacher = await this.prisma.teacher.findUnique({ where: { userId: user.id } });
    if (!teacher) return [];
    const assignments = await this.prisma.teacherAssignment.findMany({
      where: { teacherId: teacher.id },
      include: { courseOffering: { include: { class: true, course: true } } }
    });
    return assignments.map(a => a.courseOffering);
  }

  @Get('assignments')
  async getAssignments(@Req() req: any) {
    return this.prisma.assignment.findMany({
      where: { tenantId: req.user.tenantId },
      include: { courseOffering: { include: { course: true, class: true } }, _count: { select: { submissions: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Post('assignments')
  async createAssignment(@Req() req: any, @Body() data: any) {
    const { courseOfferingId, title, description, language, marks, testCases } = data;
    return this.prisma.assignment.create({
      data: {
        tenantId: req.user.tenantId,
        courseOfferingId,
        title,
        description,
        language,
        marks,
        testCases: {
          create: testCases.map((tc: any) => ({ input: tc.input, expected: tc.expected, isHidden: tc.isHidden }))
        }
      }
    });
  }
}
