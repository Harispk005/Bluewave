const mongo=require('mongoose');
const paymentschema=new mongo.Schema({
    booking:{type:mongo.Schema.Types.ObjectId,ref:"booking"},
    login:{type:mongo.Schema.Types.ObjectId,ref:"login"},
    date: String,   
    amount: String,
    status: String
});
const payment=mongo.model('payments',paymentschema);
module.exports=payment;    
    