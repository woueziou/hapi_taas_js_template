const {
    Schema
} = require('mongoose');
const mdb = require('../../datasources/mongo');
const moment = require('moment');
const schema = {
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: String,
    scope: String,
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    date_create: {
        type: Number,
        default: moment().unix()
    },
    date_update: Number,
};
const UserModel = mdb.model('User', new Schema(schema, {
    collection: 'Users'
}));
module.exports = UserModel;