import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TeacherStudentAccessGuard } from './teacher.guard';
import { PrismaService } from '../../prisma/prisma.service';

describe('TeacherStudentAccessGuard', () => {
  let guard: TeacherStudentAccessGuard;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherStudentAccessGuard,
        {
          provide: PrismaService,
          useValue: {
            teacher: {
              findUnique: vi.fn()
            }
          }
        }
      ]
    }).compile();

    guard = module.get<TeacherStudentAccessGuard>(TeacherStudentAccessGuard);
    prisma = module.get<PrismaService>(PrismaService);
  });

  const createMockContext = (studentId: string, isTeacher: boolean = true) => ({
    switchToHttp: () => ({
      getRequest: () => ({
        user: {
          id: 'teacher-user-1',
          userRoles: isTeacher ? [{ role: { name: 'TEACHER' } }] : [{ role: { name: 'STUDENT' } }]
        },
        params: { studentId }
      })
    })
  } as unknown as ExecutionContext);

  it('should allow access if user is not a teacher (bypasses to other guards)', async () => {
    const context = createMockContext('student-1', false);
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow access if teacher has assignment to a class the student is in', async () => {
    const context = createMockContext('authorized-student');
    
    vi.mocked(prisma.teacher.findUnique).mockResolvedValue({
      id: 'teacher-1',
      userId: 'teacher-user-1',
      assignments: [
        {
          courseOffering: {
            studentEnrollments: [
              { studentId: 'authorized-student' }
            ]
          }
        }
      ]
    } as any);

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw ForbiddenException if teacher tries to access unassigned student (Attack Case)', async () => {
    const context = createMockContext('unauthorized-student');
    
    vi.mocked(prisma.teacher.findUnique).mockResolvedValue({
      id: 'teacher-1',
      userId: 'teacher-user-1',
      assignments: [
        {
          courseOffering: {
            studentEnrollments: [
              { studentId: 'authorized-student' }
            ]
          }
        }
      ]
    } as any);

    await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException);
    await expect(guard.canActivate(context)).rejects.toThrow('You do not have access to this student');
  });
});
