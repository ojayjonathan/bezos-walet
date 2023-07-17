import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  try {
    await prisma.merchants.deleteMany();
    await prisma.tags.deleteMany();
  } catch {}
  
  await prisma.tags.createMany({
    data: [{ name: "Bezos" }, { name: "Musk" }],
  });

  const tags = await prisma.tags.findMany();

  const SEED_DATA = [
    { name: "Amazon", tagId: tags.find((tag) => tag.name === "Bezos")!.id },
    {
      name: "Washington Post",
      tagId: tags.find((tag) => tag.name === "Bezos")!.id,
    },
    {
      name: "Whole Foods",
      tagId: tags.find((tag) => tag.name === "Bezos")!.id,
    },
    {
      name: "Blue Origin",
      tagId: tags.find((tag) => tag.name === "Bezos")!.id,
    },
    { name: "Tesla", tagId: tags.find((tag) => tag.name === "Musk")!.id },
    { name: "SpaceX", tagId: tags.find((tag) => tag.name === "Musk")!.id },
  ];

  await prisma.merchants.createMany({ data: SEED_DATA });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
