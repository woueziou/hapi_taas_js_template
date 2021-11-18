const UserModel = require('../../data/models/core/user.model');
const _ = require('lodash');
const JWT = require('jsonwebtoken');
const jwtconfig = require('../../utils/jwtconfig');
const PasswordUtils = require('../../utils/pwd-utils');

const AuthService = {
    async register(user) {
        return new Promise((res, rej) => {
            UserModel.findOne().where('phone').equals(user.phone).then(async (value) => {
                console.log(value);
                if (_.isEmpty(value) || value === null) {
                    // save user in the db
                    const hashed = await PasswordUtils.hashPassword(user.password);
                    const u = new UserModel({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        phone: user.phone,
                        password: hashed,
                        scope: 'admin',
                    });
                    u.save().then(value => {
                        const identity = {
                            id: value._id,
                            last_name: value.last_name,
                            scope: value.scope
                        };
                        const token = JWT.sign(identity, jwtconfig.key);
                        return res(token);
                    }).catch(err => {
                        rej(err);
                    });
                } else {
                    rej('User exists');
                }
            }).catch(err => {
                rej(err);
            });
        });
    },
    async login(credentials) {
        return new Promise((res, rej) => {
            UserModel.findOne().where('phone').equals(credentials.phone).then(async (value) => {
                console.log(credentials);
                if (_.isEmpty(value)) {
                    // save user in the db
                    rej('Numéro de telephone ou mot de pass incorrect');
                } else {
                    // compare passwords
                    const isPwdRight = await PasswordUtils.checkPassword(credentials.password, value.password);
                    if (isPwdRight) {
                        // gen token
                        const identity = {
                            id: value._id,
                            last_name: value.last_name,
                            scope: value.scope
                        };
                        const token = JWT.sign(identity, jwtconfig.key);
                        res(token);
                    }
                    // user wrong password
                    rej('Numéro de telephone ou mot de pass incorrect');
                }
            }).catch(err => {
                rej(err);
            });
        });

    },
    async renewtoken(token) {
        // console.log(token);
        return new Promise((res, rej) => {
            jwtconfig.renew(token).then(value => {
                console.log('###new value###');
                console.log(value);
                return res(value);
            }).catch(err => {
                rej(err);
            });
        });
    }
};
module.exports = AuthService;