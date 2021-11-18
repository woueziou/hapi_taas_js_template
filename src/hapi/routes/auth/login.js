const Boom = require('@hapi/boom');
const Joi = require('joi');
const AuthService = require('../../../services/core/auth.service');

// const Userservice = require('../services/user.service');
const login = {
    method: 'POST',
    path: '/auth/login',
    options: {
        description: 'Login user',
        notes: 'Return String',
        tags: ['api', 'Auth'],
        // auth: {
        //     scop: false
        // },
        // eslint-disable-next-line no-unused-vars
        handler: async (request, h) => {
            const data = request.payload;
            try {
                const token = await AuthService.login(data);
                return token;
            } catch (error) {
                return Boom.unauthorized('Erreur d\'authentification');
            }
        },
        validate: {
            payload: Joi.object({
                phone: Joi.string(),
                password: Joi.string(),
            }).label('LoginModel')
        }
    },

};
module.exports = login;