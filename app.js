const { urlencoded } = require('body-parser');
const express=require('express');
const app=express();
const port=8000;
const session=require('express-session');
app.use(express.static('uploads'));
const cors=require('cors');
app.use(cors());

app.use(session({
    secret:'key',
    resave:true,
    saveUninitialized:true
}));


app.use (urlencoded({extended:true}));

const adminroute=require('./Routes/admin');
const trainerroute=require('./Routes/trainer');
const userroute=require('./Routes/user');

app.use(express.json());

app.use('/',adminroute);
app.use('/user',userroute);
app.use('/trainer',trainerroute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

module.exports=app;

