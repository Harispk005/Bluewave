const mongo=require('mongoose');
const chatschema=new mongo.Schema({
   sender:{type:mongo.Schema.Types.ObjectId,ref:"login"},
   receiver:{type:mongo.Schema.Types.ObjectId,ref:"login"},
   message:String 
});
const chat=mongo.model('chating',chatschema);
module.exports=chat;