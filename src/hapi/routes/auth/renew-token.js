const Joi = require('joi');
const Boom = require('@hapi/boom');
// const JWT = require('jsonwebtoken');
const AuthService = require('../../../services/core/auth.service');
// const Userservice = require('../services/user.service');
const whoami = {
    method: 'POST',
    path: '/auth/renew',
    options: {
        response: {
            schema: Joi.string().label('Refreshed Token')
        },
        description: 'User Info',
        notes: 'Return User info',
        tags: ['api', 'Auth'],
        // auth: {
        //     strategy: 'jwt'
        // },
        // eslint-disable-next-line no-unused-vars
        handler: async (request, h) => {
            const data = request.payload;
            try {

                const newtoken = await AuthService.renewtoken(data.token);
                console.log('###new token###');
                console.log(newtoken);
                return newtoken;
            } catch (error) {
                return Boom.unauthorized('Erreur d\'authentification');
            }
        },
        validate: {
            payload: Joi.object({
                token: Joi.string()
            }).label('Renew Token'),

        }
    },

};
module.exports = whoami;