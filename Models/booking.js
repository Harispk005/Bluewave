const mongo = require('mongoose');
const bookscheama = new mongo.Schema({
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    trainer:{type:mongo.Schema.Types.ObjectId,ref:"trainerdetails"},
    image:String,
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    duration: String,
    amount: String,
    pools:String,
    trainername:String,
    paymentmethod: String,
    paymentstatus: String,
    adminstatus: String,
    trainerstatus: String,  
});
const book=mongo.model('booking',bookscheama);
module.exports=book;