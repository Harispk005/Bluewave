const mongo = require('mongoose');
const env=require('dotenv');
env.config();
const mongodburl=process.env.MONGO_URL

const db=async()=>{
    await mongo.connect(mongodburl);
    console.log('connected');
}

module.exports=db