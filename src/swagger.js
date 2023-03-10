const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('node:fs');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'access_token'
        }
      },
      schemas: {
        Post: {
          type: 'object',
          description: 'Post entity',
          required: ['id', 'title', 'slug', 'tags', 'body', 'images', 'createdAt'],
          properties: {
            id: {
              type: 'string',
              example: '15cbf48e-c7ed-4ec3-a65f-2a0f4759e9f1',
              description: 'Post id',
            },
            title: {
              type: 'string',
              example: 'título de um post',
              description: 'Post title',
            },
            slug: {
              type: 'string',
              example: 'titulo-de-um-post',
              description: 'Post slug',
            },
            tags: {
              type: 'string',
              example: 'javascript,html',
              description: 'Post tags',
            },
            body: {
              type: 'string',
              example: '##Markup',
              description: 'Post content body',
            },
            images: {
              type: 'array',
              items: { $ref: '#/components/schemas/Image' },
            },
            createdAt: {
              type: 'string',
              description: 'Post date',
            },
          },
        },
        PostPaginated: {
          type: 'object',
          description: 'Post paginated',
          required: ['rows', 'page', 'totalRecords', 'content'],
          properties: {
            content: {
              type: 'array',
              items: { $ref: '#/components/schemas/Post' },
            },
            rows: {
              type: 'integer',
              example: '5',
            },
            page: {
              type: 'integer',
              example: '0',
            },
            totalRecords: {
              type: 'integer',
              example: '10',
            },
          },
        },
        PostCreate: {
          type: 'object',
          description: 'Post create DTO',
          required: ['title', 'tags', 'body', 'imagesIds'],
          properties: {
            title: {
              type: 'string',
              example: 'título de um post',
              description: 'Post title',
            },
            tags: {
              type: 'string',
              example: 'javascript,html',
              description: 'Post tags',
            },
            body: {
              type: 'string',
              example: '##Markup',
              description: 'Post content body',
            },
            imagesIds: {
              type: 'array',
              items: {
                type: 'string',
                example: '15cbf48e-c7ed-4ec3-a65f-2a0f4759e9f1',
                description: 'Image Ids',
              },
            },
          },
        },
        Image: {
          type: 'object',
          description: 'Image entity',
          required: ['id', 'small', 'medium', 'large'],
          properties: {
            id: {
              type: 'string',
              example: '15cbf48e-c7ed-4ec3-a65f-2a0f4759e9f1',
              description: 'Image id',
            },
            small: {
              type: 'string',
              description: 'Image small',
            },
            medium: {
              type: 'string',
              description: 'Image medium',
            },
            large: {
              type: 'string',
              description: 'Image large',
            },
          },
        },
        ImageCreated: {
          type: 'object',
          description: 'Image created succesfuly',
          required: ['imageId', 'message'],
          properties: {
            imageId: {
              type: 'string',
              example: '15cbf48e-c7ed-4ec3-a65f-2a0f4759e9f1',
              description: 'Image id',
            },
            message: {
              type: 'string',
              example: 'image created succesfully',
            },
          },
        },
      },
      parameters: {
        rows: {
          name: 'rows',
          in: 'query',
          description: 'number of rows to be returned',
          required: true,
          schema: {
            type: 'integer',
          },
        },
        page: {
          name: 'page',
          in: 'query',
          description: 'number of pages to be returned',
          required: true,
          schema: {
            type: 'integer',
          },
        },
        order: {
          name: 'order',
          in: 'query',
          description: 'ordering to be returned [ field,order ]',
          required: true,
          schema: {
            type: 'string',
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*/*.ts'], // files containing annotations as above
};

const result = swaggerJsdoc(options);
fs.writeFileSync('swagger.json', JSON.stringify(result));

module.exports = { openapiSpecification: result };
