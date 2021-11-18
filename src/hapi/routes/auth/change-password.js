const
    Boom = require('@hapi/boom');
const Joi = require('joi');
const UserService = require('../../../services/core/user.service');
const PasswordUtils = require('../../../utils/pwd-utils');

const route = {
    method: 'POST',
    path: '/auth/changepassword',
    options: {
        response: {
            schema: Joi.string().label('Password Response')
        },
        description: 'User Info',
        notes: 'Return User info',
        tags: ['api', 'Auth'],
        auth: {
            strategy: 'jwt'
        },
        // eslint-disable-next-line no-unused-vars
        handler: async (request, h) => {
            const credentialUser = request.auth.credentials;
            const user = await UserService.lookup(credentialUser.id);
            const payload = request.payload;
            if (user) {
                // check password 
                if (await PasswordUtils.checkPassword(payload.password, user.password) === true) {
                    let hashed = await PasswordUtils.hashPassword(payload.new_password);
                    user.password = hashed;
                    await UserService.updateUser(user);
                    return 'Password updated';
                }
            }
            return Boom.unauthorized('Erreur d\'authentification');
        },
        validate: {
            payload: Joi.object({
                new_password: Joi.string(),
                password: Joi.string(),
            }).label('NewPasswordModel')
        }
    },

};
module.exports = route;