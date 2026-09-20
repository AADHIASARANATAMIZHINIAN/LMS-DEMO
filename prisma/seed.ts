import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting massive demo seed...');

  // 1. Clear existing data
  console.log('Clearing old data...');
  await prisma.studentClassEnrollment.deleteMany();
  await prisma.teacherAssignment.deleteMany();
  await prisma.courseOffering.deleteMany();
  await prisma.course.deleteMany();
  await prisma.studentGuardian.deleteMany();
  await prisma.guardian.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.coordinator.deleteMany();
  await prisma.class.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.program.deleteMany();
  await prisma.department.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // 2. Setup Roles & Language (assuming roles already exist but just in case, wait they might have been deleted)
  // Let's rely on upsert to avoid issues
  const roleNames = ['PLATFORM_ADMIN', 'PLATFORM_OWNER', 'COORDINATOR', 'TEACHER', 'STUDENT', 'PARENT'];
  const roles: any = {};
  for (const name of roleNames) {
    let r = await prisma.role.findUnique({ where: { name } });
    if (!r) r = await prisma.role.create({ data: { name } });
    roles[name] = r;
  }

  const DUMMY_HASH = await bcrypt.hash("password123", 10);

  // 3. Platform Owner
  const ownerTenant = await prisma.tenant.create({ data: { name: 'Platform Control', domain: 'platform.io' } });
  await prisma.user.create({
    data: {
      email: 'owner@platform.io',
      passwordHash: DUMMY_HASH,
      tenantId: ownerTenant.id,
      userRoles: { create: [{ roleId: roles['PLATFORM_OWNER'].id }] }
    }
  });

  // 4. Astra Institute of Technology
  console.log('Building Astra Institute of Technology...');
  const astra = await prisma.tenant.create({ data: { name: 'Astra Institute of Technology', domain: 'astra.edu' } });

  // Coordinator
  const coordUser = await prisma.user.create({
    data: { email: 'coord@astra.edu', passwordHash: DUMMY_HASH, tenantId: astra.id, userRoles: { create: { roleId: roles['COORDINATOR'].id } } }
  });
  await prisma.coordinator.create({ data: { firstName: 'Dr. Sarah', lastName: 'Connor', userId: coordUser.id, tenantId: astra.id } });

  // Departments
  const deptAI = await prisma.department.create({ data: { name: 'AI & Data Science', code: 'AIDS', tenantId: astra.id } });
  const deptCS = await prisma.department.create({ data: { name: 'Computer Science', code: 'CS', tenantId: astra.id } });

  // Programs & Batches
  const progAI = await prisma.program.create({ data: { name: 'B.Tech AI & Data Science', code: 'BTAIDS', departmentId: deptAI.id, tenantId: astra.id } });
  const progCS = await prisma.program.create({ data: { name: 'B.Tech Computer Science', code: 'BTCS', departmentId: deptCS.id, tenantId: astra.id } });

  const batch26AI = await prisma.batch.create({ data: { name: 'Class of 2026', year: 2026, programId: progAI.id, tenantId: astra.id } });
  const batch26CS = await prisma.batch.create({ data: { name: 'Class of 2026', year: 2026, programId: progCS.id, tenantId: astra.id } });

  // Classes
  const classIIA = await prisma.class.create({ data: { name: 'II-A (AI&DS)', batchId: batch26AI.id, tenantId: astra.id } });
  const classIIB = await prisma.class.create({ data: { name: 'II-B (CS)', batchId: batch26CS.id, tenantId: astra.id } });
  const classIIC = await prisma.class.create({ data: { name: 'II-C (CS)', batchId: batch26CS.id, tenantId: astra.id } });

  const allClasses = [classIIA, classIIB, classIIC];

  // Teachers (8)
  console.log('Seeding 8 Teachers...');
  const teachers = [];
  const teacherNames = ['Alan Turing', 'Grace Hopper', 'Ada Lovelace', 'John von Neumann', 'Margaret Hamilton', 'Donald Knuth', 'Tim Berners-Lee', 'Linus Torvalds'];
  for (let i = 0; i < teacherNames.length; i++) {
    const parts = teacherNames[i].split(' ');
    const first = parts[0];
    const last = parts.slice(1).join(' ');
    const email = `${first.toLowerCase()}@astra.edu`;
    const tUser = await prisma.user.create({
      data: { email, passwordHash: DUMMY_HASH, tenantId: astra.id, userRoles: { create: { roleId: roles['TEACHER'].id } } }
    });
    const teacher = await prisma.teacher.create({
      data: { firstName: first, lastName: last, employeeId: `T-00${i+1}`, userId: tUser.id, tenantId: astra.id }
    });
    teachers.push(teacher);
  }

  // Courses
  const c1 = await prisma.course.create({ data: { name: 'Data Structures', code: 'CS201', departmentId: deptCS.id, tenantId: astra.id } });
  const c2 = await prisma.course.create({ data: { name: 'Machine Learning', code: 'AI301', departmentId: deptAI.id, tenantId: astra.id } });

  const offer1 = await prisma.courseOffering.create({ data: { term: 'Fall 2026', classId: classIIB.id, courseId: c1.id, tenantId: astra.id } });
  const offer2 = await prisma.courseOffering.create({ data: { term: 'Fall 2026', classId: classIIA.id, courseId: c2.id, tenantId: astra.id } });

  await prisma.teacherAssignment.create({ data: { courseOfferingId: offer1.id, teacherId: teachers[0].id } });
  await prisma.teacherAssignment.create({ data: { courseOfferingId: offer2.id, teacherId: teachers[1].id } });

  // Students (120)
  console.log('Seeding 120 Students (this may take a moment)...');
  
  // Make student 1 highly predictable for demo
  const sUser1 = await prisma.user.create({ data: { email: 'student@astra.edu', passwordHash: DUMMY_HASH, tenantId: astra.id, userRoles: { create: { roleId: roles['STUDENT'].id } } } });
  const s1 = await prisma.student.create({ data: { firstName: 'Demo', lastName: 'Student', studentIdStr: 'AIT-001', classId: classIIA.id, userId: sUser1.id, tenantId: astra.id } });
  await prisma.studentClassEnrollment.create({ data: { studentId: s1.id, courseOfferingId: offer2.id } });

  const batchPayload = [];
  for (let i = 2; i <= 120; i++) {
    const cls = allClasses[i % allClasses.length];
    
    const sUser = await prisma.user.create({ data: { email: `student${i}@astra.edu`, passwordHash: DUMMY_HASH, tenantId: astra.id, userRoles: { create: { roleId: roles['STUDENT'].id } } } });
    await prisma.student.create({ data: { firstName: 'Student', lastName: `${i}`, studentIdStr: `AIT-${i.toString().padStart(3, '0')}`, classId: cls.id, userId: sUser.id, tenantId: astra.id } });
  }

  console.log('✅ Seed complete! Astra Institute of Technology is live.');
  console.log('----------------------------------------------------');
  console.log('Owner      : owner@platform.io');
  console.log('Coordinator: coord@astra.edu');
  console.log('Teacher 1  : alan@astra.edu');
  console.log('Student 1  : student@astra.edu');
  console.log('Password for all: password123');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
