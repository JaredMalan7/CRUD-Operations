const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'CRUD-Operations Api',
        description: 'This is a note-taker Api'
    },
    host: 'cru-operations-authenticated.onrender.com',
    schemes: ['https', 'http'],
    securityDefinitions: {
        GitHubOAuth: {
            type: 'oauth2',
            authorizationUrl: 'https://cru-operations-authenticated.onrender.com/github/callback',
            tokenUrl: 'http://github.com/login/oauth/access_token',
            flow: 'accessCode',
            scopes: {
                // getAllNotes: 'Grants access to get all notes',
                // getSingleNote: 'Grants access to get a single note',
                // createNote: 'Grants access to create a new note',
                // updateNote: 'Grants access to update a note',
                // deleteNote: 'Grants access to delete a note'
            },
        },
    },
    security: [
        {
            GitHubOAuth: [],
        },
    ],
    paths: {
        "/notes/": {
            get: {
                tags: ['CRUD Operations'],
                summary: 'Get all notes',
                description: 'Get all the notes from the database',
                security: [{ GitHubOAuth: ['getAllNotes'] }],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/Note'
                            }
                        }
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            },
            post: {
                tags: ['CRUD Operations'],
                summary: 'Create a new note',
                description: 'POST a new note to the database',
                security: [{ GitHubOAuth: ['createNote'] }],
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/NoteInput'
                        }
                    }
                ],
                responses: {
                    201: {
                        description: 'Created',
                        schema: {
                            $ref: '#/definitions/Note'
                        }
                    },
                    400: {
                        description: 'Bad Request'
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            }
        },
        "/notes/{id}": {
            get: {
                tags: ['CRUD Operations'],
                summary: 'Get a single note by ID',
                description: 'Get a single note from the database by ObjectId',
                security: [{ GitHubOAuth: ['getSingleNote'] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string'
                    }
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Note'
                        }
                    },
                    400: {
                        description: 'Bad Request'
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    404: {
                        description: 'Not Found'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            },
            put: {
                tags: ['CRUD Operations'],
                summary: 'Update a note by ID',
                description: 'PUT an update in the note requested by ObjectId from the database',
                security: [{ GitHubOAuth: ['updateNote'] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string'
                    },
                    {
                        name: 'body',
                        in: 'body',
                        required: true,
                        schema: {
                            $ref: '#/definitions/NoteInput'
                        }
                    }
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/Note'
                        }
                    },
                    400: {
                        description: 'Bad Request'
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            },
            delete: {
                tags: ['CRUD Operations'],
                summary: 'Delete a note by ID',
                description: 'DELETE a note by ObjectId from the database',
                security: [{ GitHubOAuth: ['deleteNote'] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string'
                    }
                ],
                responses: {
                    200: {
                        description: 'OK'
                    },
                    400: {
                        description: 'Bad Request'
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    404: {
                        description: 'Not Found'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            }
        }
    },
    definitions: {
        NoteInput: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    example: 'Sample Title'
                },
                content: {
                    type: 'string',
                    example: 'Sample Content'
                },
                date: {
                    type: 'string',
                    example: '2024-01-01'
                }
            },
            required: ['title', 'content']
        },
        Note: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                    example: 'ObjectId'
                },
                title: {
                    type: 'string',
                    example: 'Sample Title'
                },
                content: {
                    type: 'string',
                    example: 'Sample Content'
                },
                date: {
                    type: 'string',
                    example: '2024-01-01'
                }
            },
            required: ['_id', 'title', 'content']
        }
    }
}

const outputFile = './swagger.json'
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc)