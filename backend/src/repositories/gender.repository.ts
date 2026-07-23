import prisma from "../lib/prisma";

class GenderRepository {
  async findAll() {
    return prisma.gender.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}

export default new GenderRepository();
