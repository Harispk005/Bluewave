const mongo=require('mongoose');
const poolratingschema=new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    pool:{type:mongo.Schema.Types.ObjectId,ref:"pools"},
    name:String,
    image:String,
    rating:String,
    feedback:String
});
const poolrating=mongo.model('poolratings',poolratingschema);
module.exports=poolrating;