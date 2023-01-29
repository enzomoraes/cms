const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';

const endpointsFiles = ['../build/src/routes/*/*.js'];

swaggerAutogen(outputFile, endpointsFiles);
