const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const outputFile = './swagger_output.json';

const endpointsFiles = ['./routes/*/*.ts'];

const doc = {
  info: {
    title: 'CMS API',
    description: 'This API handles operations for Posts and Images related',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Post: {
      $id: '1',
      $title: 'título de um post',
      $slug: 'titulo-de-um-post',
      $tags: 'javascript,html',
      $body: '##Markup',
      $images: [{ $ref: '#/definitions/Image' }],
      $createdAt: new Date().toString(),
    },
    PostPaginated: {
      $content: [
        {
          $ref: '#/definitions/Post',
        },
      ],
      $rows: 5,
      $page: 0,
      $totalRecords: 10,
    },
    PostCreate: {
      $title: 'título de um post',
      $slug: 'titulo-de-um-post',
      $tags: 'javascript,html',
      $body: '##Markup',
      $imagesIds: ['1', '2'],
    },
    Image: {
      $id: '1',
      $small: 'base64',
      $medium: 'base64',
      $large: 'base64',
    },
    ImageCreated: {
      $message: 'image created succesfully',
      $id: '1',
    },
    PaginateQuery: {
      $rows: { $ref: '#/components/parameters/rows' },
      $page: { $ref: '#/components/parameters/page' },
      $order: { $ref: '#/components/parameters/order' },
    },
  },
  components: {
    parameters: {
      rows: {
        name: 'rows',
        description: 'rows to be returned in one page',
        required: true,
        schema: {
          type: 'integer',
        },
      },
      page: {
        name: 'page',
        description: 'page index of pagination',
        required: true,
        schema: {
          type: 'integer',
        },
      },
      order: {
        name: 'order',
        description: 'order of pagination [ field,order ]',
        required: true,
        example: 'title,asc',
        schema: {
          type: 'string',
        },
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
