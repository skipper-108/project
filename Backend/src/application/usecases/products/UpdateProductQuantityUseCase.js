export class UpdateProductQuantityUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, quantity) {
    // Validate input
    if (!id) {
      throw new Error('Product ID is required');
    }

    if (typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Quantity must be a non-negative number');
    }

    // Find product
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    // Update quantity
    product.updateQuantity(quantity);
    const updatedProduct = await this.productRepository.update(product);

    return updatedProduct.toJSON();
  }
} 