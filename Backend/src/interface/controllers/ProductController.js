import { CreateProductUseCase } from '../../application/usecases/products/CreateProductUseCase.js';
import { UpdateProductQuantityUseCase } from '../../application/usecases/products/UpdateProductQuantityUseCase.js';
import { GetProductsUseCase } from '../../application/usecases/products/GetProductsUseCase.js';
import { SequelizeProductRepository } from '../../infrastructure/repositories/SequelizeProductRepository.js';

const productRepository = new SequelizeProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductQuantityUseCase = new UpdateProductQuantityUseCase(productRepository);
const getProductsUseCase = new GetProductsUseCase(productRepository);

export class ProductController {
  async createProduct(req, res, next) {
    try {
      const productData = {
        name: req.body.name,
        type: req.body.type,
        sku: req.body.sku,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        quantity: parseInt(req.body.quantity),
        price: parseFloat(req.body.price),
      };

      const product = await createProductUseCase.execute(productData);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  }

  async updateProductQuantity(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const product = await updateProductQuantityUseCase.execute(
        parseInt(id),
        parseInt(quantity)
      );

      res.status(200).json({
        success: true,
        message: 'Product quantity updated successfully',
        data: product,
      });
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const result = await getProductsUseCase.execute({
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
} 