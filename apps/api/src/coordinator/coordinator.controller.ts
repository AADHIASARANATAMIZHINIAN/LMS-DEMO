import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Controller('coordinator')
@UseGuards(AuthGuard, RolesGuard)
@Roles('COORDINATOR', 'PLATFORM_ADMIN')
export class CoordinatorController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('departments')
  async getDepartments(@Req() req: any) {
    return this.prisma.department.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: { name: 'asc' },
    });
  }

  @Get('stats')
  async getStats(@Req() req: any) {
    const tenantId = req.user.tenantId;
    const [departments, students, teachers, classes] = await Promise.all([
      this.prisma.department.count({ where: { tenantId } }),
      this.prisma.student.count({ where: { tenantId } }),
      this.prisma.teacher.count({ where: { tenantId } }),
      this.prisma.class.count({ where: { tenantId } }),
    ]);
    return { departments, students, teachers, classes, pendingImports: 0 };
  }

  @Get('students')
  async getStudents(@Req() req: any) {
    return this.prisma.student.findMany({
      where: { tenantId: req.user.tenantId },
      include: {
        user: { select: { email: true, isActive: true } },
        class: { select: { name: true } },
      },
      orderBy: { lastName: 'asc' },
    });
  }

  @Post('students')
  async createStudent(@Req() req: any, @Body() data: { firstName: string, lastName: string, email: string, studentIdStr: string }) {
    const tenantId = req.user.tenantId;
    
    // Check if user already exists
    const existing = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: data.email } }
    });
    
    if (existing) {
      throw new BadRequestException("A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash("password123", 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        tenantId,
        userRoles: {
          create: {
            role: { connect: { name: 'STUDENT' } }
          }
        }
      }
    });

    const student = await this.prisma.student.create({
      data: {
        tenantId,
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        studentIdStr: data.studentIdStr,
      },
      include: {
        user: { select: { email: true, isActive: true } },
        class: { select: { name: true } }
      }
    });

    return student;
  }
}
