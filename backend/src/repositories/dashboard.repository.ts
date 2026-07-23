import prisma from "../lib/prisma";

class DashboardRepository {
  async getDashboardStats() {
    const totalProducts = await prisma.product.count();

    const totalInventory = await prisma.inventory.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const lowStock = await prisma.inventory.count({
      where: {
        quantity: {
          gt: 0,
          lte: 10,
        },
      },
    });

    const outOfStock = await prisma.inventory.count({
      where: {
        quantity: 0,
      },
    });

    return {
      totalProducts,
      totalInventory: totalInventory._sum.quantity ?? 0,
      lowStock,
      outOfStock,
    };
  }

  async getRecentProducts() {
    return prisma.product.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: true,
        category: true,
        gender: true,
      },
    });
  }
}

export default new DashboardRepository();
