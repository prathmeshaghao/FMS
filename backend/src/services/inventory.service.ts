import inventoryRepository from "../repositories/inventory.repository";
import { InventoryQuery } from "../types/inventory.types";

class InventoryService {
  async getInventory(query: InventoryQuery) {
    return inventoryRepository.findAll(query);
  }
}

export default new InventoryService();
