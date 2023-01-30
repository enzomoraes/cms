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
      $id: '1'
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
