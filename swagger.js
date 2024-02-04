const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'CRUD-Operations Api',
        description: 'This is a note-taker Api'
    },
    host: 'cru-operations-authenticated.onrender.com',
    schemes: ['https', 'http']
}

const outputFile = './swagger.json'
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc)