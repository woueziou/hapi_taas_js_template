const UserModel = require('../data/models/core/user.model');
const key = '31d6cfe0d16ae931b73c59d7e0c089c0';
const JWT = require('jsonwebtoken');
// eslint-disable-next-line no-unused-vars
const validate = async function (request, token, h) {
    try {
        const decoded = JWT.verify(token, key);
        const user = await UserModel.findById(decoded.id);

        if (user) {
            return {
                isValid: true,
                credentials: {
                    id: String(user._id),
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    scope: user.scope
                },
                artifacts: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    scope: user.scope
                }
            };
        }
        return {
            isValid: false,
            credentials: {},
            artifacts: {}
        };

    } catch (error) {
        return {
            isValid: false,
            credentials: {},
            artifacts: {}
        };
    }

};
const renew = async function (token) {
    // verify token

    // decode token

    //check the user exists
    try {
        const decoded = JWT.verify(token, key);
        // console.log('#### deci=odedd###');
        // console.log(decoded);
        const user = await UserModel.findById(decoded.id);
        if (user) {
            // console.log('#####user#######');
            // console.log(user);

            const credentials = {
                id: String(user._id),
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                scope: user.scope
            };
            const newtoken = JWT.sign(credentials, key);
            // console.log('###new token###');
            // console.log(newtoken);
            return newtoken;
        }
        throw 'Erreur d\'authentification';

    } catch (error) {
        throw 'Erreur d\'authentification';
    }

};



module.exports = {
    validate,
    key,
    renew
};