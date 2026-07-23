import prisma from "../lib/prisma";

class CompanyRepository {
  async getAll() {
    return prisma.company.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
  async create(name: string) {
    return prisma.company.create({
      data: {
        name,
      },
    });
  }

  async findByName(name: string) {
    return prisma.company.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }
}

export default new CompanyRepository();
