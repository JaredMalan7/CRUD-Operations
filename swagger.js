const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'CRUD-Operations Api',
        description: 'This is a note-taker Api'
    },
    host: 'cru-operations-authenticated.onrender.com',
    schemes: ['http', 'https'],
    securityDefinitions: {
        GitHubOAuth: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            flow: 'accessCode',
            scopes: {
                read: 'Grants read access to user profile',
            },
        },
    },
    security: [
        {
            GitHubOAuth: ['read'],
        },
    ],
}

const outputFile = './swagger.json'
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc)