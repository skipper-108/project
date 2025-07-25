import { Product } from '../../../domain/entities/Product.js';

export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const { name, type, sku, imageUrl, description, quantity, price } = productData;

    // Validate required fields
    if (!name || !type || !sku || !quantity || !price) {
      throw new Error('Name, type, SKU, quantity, and price are required');
    }

    // Validate data types and constraints
    if (typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Quantity must be a non-negative number');
    }

    if (typeof price !== 'number' || price < 0) {
      throw new Error('Price must be a non-negative number');
    }

    if (sku.length < 3) {
      throw new Error('SKU must be at least 3 characters long');
    }

    // Check if SKU already exists
    const existingProduct = await this.productRepository.findBySku(sku);
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }

    // Create product
    const product = Product.create(name, type, sku, imageUrl, description, quantity, price);
    const savedProduct = await this.productRepository.create(product);

    return savedProduct.toJSON();
  }
} 