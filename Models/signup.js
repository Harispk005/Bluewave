const mongo = require('mongoose');
const signupschema = new mongo.Schema({
    name: String,
    email: String,
    phone: String,
    image: String,
    login: { type: mongo.Schema.Types.ObjectId, ref: "login" }
});
const sign = mongo.model('signup', signupschema);
module.exports = sign;