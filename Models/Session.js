const mongo = require('mongoose');
const sessionschema = new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    trainer:{type:mongo.Schema.Types.ObjectId,ref:"trainerdetails"},
    image: String,
    name: String,
    phone: String,
    fromtime: String,
    totime: String,
    date: String,
});
const session=mongo.model('session',sessionschema);
module.exports=session;
