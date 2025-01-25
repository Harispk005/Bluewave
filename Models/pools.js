const mongo = require('mongoose');
const poolsschema = new mongo.Schema({
    Image:String,
    name:String,
    location:String,
    type:String,
    description:String,
    length:String,
    width:String,
    depth:String,
    contact:String,
    status:String
});
const pool=mongo.model('pools',poolsschema);
module.exports=pool;