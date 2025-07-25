import express from 'express';
import { body, query } from 'express-validator';
import { ProductController } from '../controllers/ProductController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const productController = new ProductController();

// Validation middleware
const validateCreateProduct = [
  body('name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('type')
    .isLength({ min: 1, max: 50 })
    .withMessage('Type must be between 1 and 50 characters'),
  body('sku')
    .isLength({ min: 3, max: 50 })
    .withMessage('SKU must be between 3 and 50 characters'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
];

const validateUpdateQuantity = [
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - sku
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "iPhone 15 Pro"
 *               type:
 *                 type: string
 *                 maxLength: 50
 *                 example: "Electronics"
 *               sku:
 *                 type: string
 *                 maxLength: 50
 *                 example: "IPH15PRO001"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/iphone15pro.jpg"
 *               description:
 *                 type: string
 *                 example: "Latest iPhone model with advanced features"
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 example: 50
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "iPhone 15 Pro"
 *                     type:
 *                       type: string
 *                       example: "Electronics"
 *                     sku:
 *                       type: string
 *                       example: "IPH15PRO001"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://example.com/iphone15pro.jpg"
 *                     description:
 *                       type: string
 *                       example: "Latest iPhone model with advanced features"
 *                     quantity:
 *                       type: integer
 *                       example: 50
 *                     price:
 *                       type: number
 *                       example: 999.99
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Product with this SKU already exists
 */
router.post('/', authenticateToken, validateCreateProduct, productController.createProduct.bind(productController));

/**
 * @swagger
 * /products/{id}/quantity:
 *   put:
 *     summary: Update product quantity
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 example: 25
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product quantity updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "iPhone 15 Pro"
 *                     type:
 *                       type: string
 *                       example: "Electronics"
 *                     sku:
 *                       type: string
 *                       example: "IPH15PRO001"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://example.com/iphone15pro.jpg"
 *                     description:
 *                       type: string
 *                       example: "Latest iPhone model with advanced features"
 *                     quantity:
 *                       type: integer
 *                       example: 25
 *                     price:
 *                       type: number
 *                       example: 999.99
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put('/:id/quantity', authenticateToken, validateUpdateQuantity, productController.updateProductQuantity.bind(productController));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Products retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "iPhone 15 Pro"
 *                           type:
 *                             type: string
 *                             example: "Electronics"
 *                           sku:
 *                             type: string
 *                             example: "IPH15PRO001"
 *                           imageUrl:
 *                             type: string
 *                             example: "https://example.com/iphone15pro.jpg"
 *                           description:
 *                             type: string
 *                             example: "Latest iPhone model with advanced features"
 *                           quantity:
 *                             type: integer
 *                             example: 50
 *                           price:
 *                             type: number
 *                             example: 999.99
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
router.get('/', authenticateToken, validatePagination, productController.getProducts.bind(productController));

export default router; 