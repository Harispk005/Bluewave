const mongo = require('mongoose');
const complaintsschema = new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    user:{type:mongo.Schema.Types.ObjectId,ref:"signup"},
    name: String,
    image: String,
    date: String,
    complaint: String,
    reply: String,
});
const complaint=mongo.model('complaints',complaintsschema);
module.exports=complaint;