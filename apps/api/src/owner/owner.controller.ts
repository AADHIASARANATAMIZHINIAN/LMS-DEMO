import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import * as bcrypt from 'bcryptjs';

@Controller('owner')
@UseGuards(RolesGuard)
export class OwnerController {
  constructor(private prisma: PrismaService) {}

  @Post('tenants')
  @Roles('PLATFORM_OWNER', 'PLATFORM_ADMIN')
  async createTenant(@Body() body: any) {
    const { name, domain, studentLimit, teacherLimit, coordinatorLimit, coordinatorName, coordinatorEmail } = body;
    
    // Create tenant with seat limits
    const tenant = await this.prisma.tenant.create({
      data: {
        name,
        domain,
        studentLimit: parseInt(studentLimit) || 600,
        teacherLimit: parseInt(teacherLimit) || 30,
        coordinatorLimit: parseInt(coordinatorLimit) || 3,
      }
    });

    // Hash dummy password
    const hash = await bcrypt.hash('password123', 10);

    // Get coordinator role
    let coordRole = await this.prisma.role.findUnique({ where: { name: 'COORDINATOR' } });
    if (!coordRole) {
      coordRole = await this.prisma.role.create({ data: { name: 'COORDINATOR' } });
    }

    // Provision Primary Coordinator Account
    const user = await this.prisma.user.create({
      data: {
        email: coordinatorEmail,
        passwordHash: hash,
        tenantId: tenant.id,
        userRoles: {
          create: [{ roleId: coordRole.id }]
        },
        coordinatorProfile: {
          create: {
            tenantId: tenant.id
          }
        }
      }
    });

    return { success: true, tenant, user };
  }

  @Get('tenants')
  @Roles('PLATFORM_OWNER', 'PLATFORM_ADMIN')
  async getTenants() {
    const tenants = await this.prisma.tenant.findMany({
      include: {
        _count: {
          select: { students: true, teachers: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return tenants.map(t => ({
      id: t.id,
      name: t.name,
      code: t.domain || 'NO-DOM',
      students: t._count.students,
      studentLimit: t.studentLimit,
      teachers: t._count.teachers,
      teacherLimit: t.teacherLimit,
      status: 'active',
      lastActive: 'Now'
    }));
  }
}
