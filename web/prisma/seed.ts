import { getUsersSeed } from "./seeds";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = await getUsersSeed();
    for(const user of users) {
      await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: user
    });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
