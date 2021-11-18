const Joi = require('joi');
const AuthService = require('../../../services/core/auth.service');
const Boom = require('@hapi/boom');
// const Userservice = require('../services/user.service');
const register = {
    method: 'POST',
    path: '/auth/register',
    options: {
        description: 'Create user',
        notes: 'Return String',
        tags: ['api', 'Auth'],
        // auth: {
        //     scop: false
        // },
        // eslint-disable-next-line no-unused-vars
        handler: async (request, h) => {
            const data = request.payload;
            try {
                const token = await AuthService.register(data);
                return token;
            } catch (error) {
                return Boom.conflict('user exists');
            }
        },
        validate: {
            payload: Joi.object({
                first_name: Joi.string(),
                last_name: Joi.string(),
                phone: Joi.string(),
                username: Joi.string(),
                password: Joi.string(),
            }).label('RegisterModel')
        }
    },

};
module.exports = register;