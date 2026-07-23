import productRepository from "../repositories/product.repository";
import { CreateProductDto } from "../schemas/product.schema";

class ProductService {
  async createProduct(data: CreateProductDto) {
    return productRepository.create(data);
  }

  async getAllProducts() {
    return productRepository.findAll();
  }

  async getProductById(id: number) {
    return productRepository.findById(id);
  }

  async updateProduct(id: number, data: CreateProductDto) {
    return productRepository.update(id, data);
  }
  async deleteProduct(id: number) {
    return productRepository.deleteProduct(id);
  }
}

export default new ProductService();
