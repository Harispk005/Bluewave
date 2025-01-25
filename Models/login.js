const mongo = require('mongoose');
const logschema = new mongo.Schema({
    username: String,
    password: String,
    type: String
});
const log = mongo.model('login', logschema);
module.exports = log;
