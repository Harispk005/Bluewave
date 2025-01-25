const mongo = require('mongoose');
const trainer = require('./trainerdetails');
const requestschema = new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    trainer:{type:mongo.Schema.Types.ObjectId,ref:"trainerdetails"},
    image: String,
    name: String,
    requestat: String,
    status: String
});
const request=mongo.model('requests',requestschema);
module.exports=request;