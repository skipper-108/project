const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management Tool API',
      version: '1.0.0',
      description: 'A complete inventory management backend API with authentication and product management',
      contact: {
        name: 'API Support',
        email: 'support@inventorytool.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            username: {
              type: 'string',
              example: 'john_doe',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'iPhone 15 Pro',
            },
            type: {
              type: 'string',
              example: 'Electronics',
            },
            sku: {
              type: 'string',
              example: 'IPH15PRO001',
            },
            imageUrl: {
              type: 'string',
              example: 'https://example.com/iphone15pro.jpg',
            },
            description: {
              type: 'string',
              example: 'Latest iPhone model with advanced features',
            },
            quantity: {
              type: 'integer',
              example: 50,
            },
            price: {
              type: 'number',
              example: 999.99,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User registration and login endpoints',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
    ],
  },
  apis: ['src/interface/routes/*.js'],
};

export default swaggerOptions; 