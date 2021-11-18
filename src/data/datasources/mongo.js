const mongooseclient = require('mongoose');
// const appconfigs = require('../appconfig');
const DB_URL = process.env.NODE_ENV === 'production' ? `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@${process.env.DATABASE_HOST}:27017` : 'mongodb://localhost:27017';
// const DB_URL = process.env.NODE_ENV === 'production' ? `mongodb://${appconfigs.DATABASE_USER}:${appconfigs.DATABASE_PWD}@${appconfigs.DATABASE_HOST}:27017` : 'mongodb://localhost:27017';
mongooseclient.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    poolSize: 3,
    dbName: process.env.DATABASE_NAME,
    useFindAndModify: false,
    autoIndex: false
});

module.exports = mongooseclient.connection;