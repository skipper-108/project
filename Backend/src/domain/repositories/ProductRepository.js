import { Product } from '../entities/Product.js';

export class ProductRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findBySku(sku) {
    throw new Error('Method not implemented');
  }

  async findAll(options = {}) {
    throw new Error('Method not implemented');
  }

  async create(product) {
    throw new Error('Method not implemented');
  }

  async update(product) {
    throw new Error('Method not implemented');
  }

  async updateQuantity(id, quantity) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
} 