import Product from '../database/models/Product.js';
import { Product as ProductEntity } from '../../domain/entities/Product.js';

export class SequelizeProductRepository {
  async findById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) return null;

      return new ProductEntity(
        product.id,
        product.name,
        product.type,
        product.sku,
        product.imageUrl,
        product.description,
        product.quantity,
        parseFloat(product.price),
        product.createdAt,
        product.updatedAt
      );
    } catch (error) {
      throw new Error(`Error finding product by ID: ${error.message}`);
    }
  }

  async findBySku(sku) {
    try {
      const product = await Product.findOne({ where: { sku } });
      if (!product) return null;

      return new ProductEntity(
        product.id,
        product.name,
        product.type,
        product.sku,
        product.imageUrl,
        product.description,
        product.quantity,
        parseFloat(product.price),
        product.createdAt,
        product.updatedAt
      );
    } catch (error) {
      throw new Error(`Error finding product by SKU: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      const { limit = 10, offset = 0 } = options;
      
      const products = await Product.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
      });

      const productEntities = products.rows.map(product => 
        new ProductEntity(
          product.id,
          product.name,
          product.type,
          product.sku,
          product.imageUrl,
          product.description,
          product.quantity,
          parseFloat(product.price),
          product.createdAt,
          product.updatedAt
        )
      );

      return {
        products: productEntities.map(p => p.toJSON()),
        total: products.count,
        page: Math.floor(offset / limit) + 1,
        limit: parseInt(limit),
        totalPages: Math.ceil(products.count / limit),
      };
    } catch (error) {
      throw new Error(`Error finding products: ${error.message}`);
    }
  }

  async create(productEntity) {
    try {
      const product = await Product.create({
        name: productEntity.name,
        type: productEntity.type,
        sku: productEntity.sku,
        imageUrl: productEntity.imageUrl,
        description: productEntity.description,
        quantity: productEntity.quantity,
        price: productEntity.price,
      });

      return new ProductEntity(
        product.id,
        product.name,
        product.type,
        product.sku,
        product.imageUrl,
        product.description,
        product.quantity,
        parseFloat(product.price),
        product.createdAt,
        product.updatedAt
      );
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async update(productEntity) {
    try {
      const product = await Product.findByPk(productEntity.id);
      if (!product) {
        throw new Error('Product not found');
      }

      await product.update({
        name: productEntity.name,
        type: productEntity.type,
        sku: productEntity.sku,
        imageUrl: productEntity.imageUrl,
        description: productEntity.description,
        quantity: productEntity.quantity,
        price: productEntity.price,
      });

      return new ProductEntity(
        product.id,
        product.name,
        product.type,
        product.sku,
        product.imageUrl,
        product.description,
        product.quantity,
        parseFloat(product.price),
        product.createdAt,
        product.updatedAt
      );
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async updateQuantity(id, quantity) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }

      await product.update({ quantity });

      return new ProductEntity(
        product.id,
        product.name,
        product.type,
        product.sku,
        product.imageUrl,
        product.description,
        product.quantity,
        parseFloat(product.price),
        product.createdAt,
        product.updatedAt
      );
    } catch (error) {
      throw new Error(`Error updating product quantity: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }

      await product.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
} 