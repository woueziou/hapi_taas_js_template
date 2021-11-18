'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const {
    log
} = require('console');
const jwt_validate = require('../utils/jwtconfig').validate;
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const AuthBearer = require('hapi-auth-bearer-token');
const Pack = require('../../package.json');
const {
    BASE_DIR
} = require('../../server-config');
const swaggerOptions = {
    schemes: ['http', 'https'],
    info: {
        title: `${process.env.BOT_NAME} Server api doc`,
        version: Pack.version,
        contact: {
            name: 'Taas Ekpaye',
            email: 'taasekpaye@outlook.fr',
        }
    },
    security: [{
        api_key: {
            type: 'apiKey', // apiKey is defined by the Swagger spec
            name: 'Authorization', // the name of the query parameter / header
            in: 'header'
        }
    }],
    securityDefinitions: {
        api_key: {
            type: 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        },
    },
    grouping: 'tags'
};
const HapiServer = {
    // var expServer;
    async start() {
        const server = Hapi.server({
            port: process.env.SERVER_PORT,
            host: '0.0.0.0',
            routes: {
                files: {
                    relativeTo: Path.join(BASE_DIR, 'public')
                }
            }
        });
        server.register(AuthBearer);
        server.auth.strategy('jwt', 'bearer-access-token', {
            allowQueryToken: false, // optional, false by default
            validate: jwt_validate,
        });

        await server.register(require('@hapi/inert'));

        await server.register({
            plugin: require('hapijs-status-monitor'),
            options: {
                title: 'Ervin Status Monitor'
            }
        });

        await server.register({
            plugin: require('hapi-auto-route'),
            options: {
                routes_dir: Path.join(BASE_DIR, '/src/hapi/routes/')
            }
        });

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);





        await server.start(); // start the web server gracefully with 🔥
        log('Server running on %s\n🔥🔥🔥', server.info.uri);
        process.on('unhandledRejection', (err) => {
            console.log(err);
            process.exit(1);
        });
    }
};


module.exports = HapiServer;


// init();