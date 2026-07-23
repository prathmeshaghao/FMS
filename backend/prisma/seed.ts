import { PrismaClient } from "@prisma/client";
import { process } from "zod/v4/core";

const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
      { name: "Nike" },
      { name: "Adidas" },
      { name: "Puma" },
      { name: "Campus" },
      { name: "Bata" },
      { name: "Woodland" },
      { name: "Red Tape" },
      { name: "Sparx" },
      { name: "Paragon" },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: "Sports Shoes" },
      { name: "Casual Shoes" },
      { name: "Leather Shoes" },
      { name: "School Shoes" },
      { name: "Slippers" },
      { name: "Sandals" },
    ],
    skipDuplicates: true,
  });

  await prisma.gender.createMany({
    data: [
      { name: "Men" },
      { name: "Women" },
      { name: "Kids" },
      { name: "Unisex" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
