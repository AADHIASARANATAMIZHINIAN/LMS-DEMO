import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.student.updateMany({
    where: { firstName: 'Demo' },
    data: { firstName: 'Alex' }
  });
  console.log("Renamed Demo to Alex");
}
main().catch(console.error).finally(() => prisma.$disconnect());
