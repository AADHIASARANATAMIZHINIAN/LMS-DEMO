import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const teacher = await prisma.teacher.findFirst({ where: { user: { email: 'alan@astra.edu' } } });
  const assignment = await prisma.teacherAssignment.findFirst({ where: { teacherId: teacher?.id } });
  if (!assignment) return;
  await prisma.assignment.create({
    data: {
      tenantId: teacher!.tenantId,
      courseOfferingId: assignment.courseOfferingId,
      title: "Binary Tree Inversion",
      description: "Given the root of a binary tree, invert the tree, and return its root. \n\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
      language: "python",
      marks: 100,
      testCases: {
        create: [
          { input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]", isHidden: false },
          { input: "[2,1,3]", expected: "[2,3,1]", isHidden: true }
        ]
      }
    }
  });
  console.log("Assignment seeded.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
