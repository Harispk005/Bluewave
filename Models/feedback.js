const mongo = require('mongoose');
const feedbackschema = new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    image:String,
    name: String,
    feedback: String,
    rating: String,
});
const feedback=mongo.model('feedback',feedbackschema);
module.exports=feedback