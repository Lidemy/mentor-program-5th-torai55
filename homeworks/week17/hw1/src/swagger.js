const path = require('path')
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'blog API',
    description: 'API for wk17 hw1.'
  },
  host: 'localhost:8686',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints'
    }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'X-API-KEY', // name of the header, query parameter or cookie
      description: 'any description...'
    }
  },
  definitions: {
    Parents: {
      father: 'Simon Doe',
      mother: 'Marie Doe'
    },
    User: {
      name: 'Jhon Doe',
      age: 29,
      parents: {
        $ref: '#/definitions/Parents'
      },
      diplomas: [
        {
          school: 'XYZ University',
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: 'XYZ Company'
          }
        }
      ]
    },
    AddUser: {
      $name: 'Jhon Doe',
      $age: 29,
      about: ''
    }
  }
}

const outputFile = path.resolve(__dirname, './swagger_output.json')
const endpointsFiles = [path.resolve(__dirname, './index.js')] // 用 express 的 router 的話只要放 entry point

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index')
})
