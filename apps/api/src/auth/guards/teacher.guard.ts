import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeacherStudentAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) return false;

    const isTeacher = user.userRoles.some((ur: any) => ur.role.name === 'TEACHER');
    if (!isTeacher) return true; // If not a teacher, bypass this specific guard

    const targetStudentId = request.params.studentId || request.body.studentId || request.query.studentId;
    if (!targetStudentId) return true; // No target student in request

    const teacher = await this.prisma.teacher.findUnique({
      where: { userId: user.id },
      include: {
        assignments: {
          include: {
            courseOffering: {
              include: {
                studentEnrollments: true
              }
            }
          }
        }
      }
    });

    if (!teacher) {
      throw new ForbiddenException('Teacher profile not found');
    }

    let isAuthorized = false;
    for (const assignment of teacher.assignments) {
      if (assignment.courseOffering.studentEnrollments.some(e => e.studentId === targetStudentId)) {
        isAuthorized = true;
        break;
      }
    }

    if (!isAuthorized) {
      throw new ForbiddenException('You do not have access to this student');
    }

    return true;
  }
}
