const mongo =require('mongoose');
const trainerschema = new mongo.Schema({
    name: String,
    email:String,
    phone:String,
    gender:String,
    age:String,
    image:String,
    qualification:String,
    skills:String,
    experience:String,
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"}
    
});
const trainer=mongo.model('trainerdetails',trainerschema);
module.exports=trainer;
