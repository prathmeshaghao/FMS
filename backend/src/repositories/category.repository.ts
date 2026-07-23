import prisma from "../lib/prisma";

class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
  async create(name: string) {
    return prisma.category.create({
      data: {
        name,
      },
    });
  }
  async findByName(name: string) {
    return prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }
}

export default new CategoryRepository();
