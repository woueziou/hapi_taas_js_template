const Joi = require('joi');


// const Userservice = require('../services/user.service');
const whoami = {
    method: 'GET',
    path: '/auth/whoami',
    options: {
        response: {
            schema: Joi.object({
                id: Joi.string(),
                first_name: Joi.string(),
                last_name: Joi.string(),
                username: Joi.string(),
                scope: Joi.string(),
            }).label('AccountModel')
        },
        description: 'User Info',
        notes: 'Return User info',
        tags: ['api', 'Auth'],
        auth: {
            strategy: 'jwt'
        },
        // eslint-disable-next-line no-unused-vars
        handler: async (request, h) => {
            const user = request.auth.credentials;
            return user;
        }
    },

};
module.exports = whoami;