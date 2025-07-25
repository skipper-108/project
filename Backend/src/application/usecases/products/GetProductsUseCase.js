export class GetProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(options = {}) {
    const { page = 1, limit = 10 } = options;

    // Validate pagination parameters
    if (page < 1) {
      throw new Error('Page must be a positive number');
    }

    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    const offset = (page - 1) * limit;
    const products = await this.productRepository.findAll({ limit, offset });

    return products;
  }
} 