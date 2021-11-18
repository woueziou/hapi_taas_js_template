const {
    Schema
} = require('mongoose');
const mdb = require('../../datasources/mongo');
const moment = require('moment');
const schema = {
    client_id: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    date_create: {
        type: Number,
        default: moment().unix()
    },

};
const UserInputModel = mdb.model('UserInput', new Schema(schema, {
    collection: 'UserInputs'
}));
module.exports = UserInputModel;