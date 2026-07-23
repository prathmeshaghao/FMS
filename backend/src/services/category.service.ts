import prisma from "../lib/prisma";
import categoryRepository from "../repositories/category.repository";

class CategoryService {
  async getAllCategories() {
    return categoryRepository.findAll();
  }

  async createCategory(name: string) {
    const existing = await categoryRepository.findByName(name);

    if (existing) {
      throw new Error("Category already exists");
    }

    return categoryRepository.create(name);
  }
}

export default new CategoryService();
