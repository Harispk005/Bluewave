const express = require('express');
const router = express.Router();
const db = require('../Config/db');
db();
const log = require('../Models/login');
const sign = require('../Models/signup');
const complaint = require('../Models/complaints');
const pool = require('../Models/pools');
const trainers = require('../Models/trainerdetails');
const booking = require('../Models/booking');
const request = require('../Models/requests');
const feedback = require('../Models/feedback');
const competition = require('../Models/competition');
const sessions = require('../Models/Session');
const chat = require('../Models/chating');
const payment = require('../Models/payments');
const poolrating = require('../Models/poolratings');





const multer = require('multer');
const { use } = require('./admin');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg")
    }
});

const upload = multer({ storage: storage });

router.get('/user', (req, res) => {
    res.send('GET request to the homepage');
});


router.post('/signup_post', upload.single('image'), async (req, res) => {
    try {
        const { email, phone, username } = req.body;

       
        const Userexist = await sign.findOne({
            $or: [
                { email: email },
                { phone: phone },
                { username: username },
            ],
        });

        if (Userexist) {
            
            return res.json({ status: "signupfailure", message: "Email, phone, or username already exists" });
        }

     
        const login = {
            username: req.body.username,
            password: req.body.password,
            type: "user",
        };
        const logdata = new log(login);
        await logdata.save();

        
        const signup = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
            username: req.body.username,
            password: req.body.password,
            login: logdata._id,
        };

        const signupdata = new sign(signup);
        await signupdata.save();

       
        res.json({ status: "signupsuccess" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


router.get('/userhome', async (req, res) => {
    res.json({ status: "sucessuser" });
});


router.get('/userprofile', async (req, res) => {
    const lid = req.query.lid;


    const data = await sign.findOne({ login: lid }).populate('login');

    res.json({ "data": data });
});
router.post('/editprofile_post', upload.single('image'), async (req, res) => {
    const existimage = await sign.findOne({ login: req.body.id });
 
    
    
    const editprofile = {
        image: req.file ? req.file.filename : existimage.image,
        username: req.body ? req.body.username : existimage.username,
        name: req.body ? req.body.name : existimage.name,
        email: req.body ? req.body.email : existimage.email,
        phone: req.body ? req.body.phone : existimage.phone,
   

    }
    await sign.findOneAndUpdate({ login: req.body.id }, { $set: editprofile });
    await log.findByIdAndUpdate({ _id: req.body.id }, { $set: { username: req.body.username, password: req.body.password } });

    res.json({ 'status': "sucesseditprofile" });
});

router.get('/userpass', async (req, res) => {
    const lid = req.query.lid;
    const data = await log.findOne({ _id: lid });
    
    res.json({ "data": data });
});
router.post('/changepass_post', async (req, res) => {
    const lid = req.body.lid;
    // const existpass = await log.findOne({ _id: lid });

    const changepass = {
        password: req.body.password 
    };

    await log.findOneAndUpdate({ _id: lid }, { $set: changepass });

    res.json({ 'status': "sucesschangepass" });
});
router.get('/signup_get', async (req, res) => {
    const data = await sign.find();
    res.json({ 'data': data });
});

router.post('/complaint_post', async (req, res) => {

    const signdata = await sign.findOne({ login: req.body.lid });
    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const compdata = {
        complaint: req.body.complaint,
        reply: 'pending',
        name: signdata.name,
        image: signdata.image,
        login: req.body.lid,
        date: formattedDate




    }

    const aa = new complaint(compdata);
    await aa.save();

    res.json({ status: "successcomplaint" });

});

router.get('/viewreply', async (req, res) => {
    const lid = req.query.lid;


    const data = await complaint.find({ login: lid });


    res.json({ "data": data });
});

router.get('/getviewpool/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);


    const data = await pool.findOne({ _id: id });
    res.json({ 'data': data });
});
router.get('/gettrainers', async (req, res) => {
    const lid=req.query.lid;
    
    const data=[];

    const trainer = await trainers.find();

    for(i of trainer){
        var acc="";
        const ex=await request.findOne({login:lid,trainer:i.login,status:"accepted"});
        // console.log(i._id);
        
        if(ex){
            acc="accepted";
        }
        
        data.push({_id:i.id,name:i.name,email:i.email,image:i.image,phone:i.phone,gender:i.gender,age:i.age,qualification:i.qualification,skills:i.skills,experience:i.experience,login:i.login,status:acc});
        
    }

    res.json({ 'data': data });
});
router.get('/gettrainerdetails/:id', async (req, res) => {
    const id = req.params.id;
    const data = await trainers.findOne({ _id: id });
    res.json({ 'data': data });
});

router.post('/bookslots_post', async (req, res) => {

    const { trainer, lid, name, phone, date, time, pool, email, duration, amount } = req.body;

    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);

    const provideddate = new Date(date);
    provideddate.setHours(0, 0, 0, 0);
    
    const maxdate = new Date();
    maxdate.setDate(currentdate.getDate() + 7);


    if(provideddate < currentdate || provideddate > maxdate){
        res.json({status:"dateerror"});
        return;
    }

    const trainerdata = await trainers.findOne({ _id: trainer });
    const singdata = await sign.findOne({ login: lid });
    // console.log(singdata);


    const bookslots = {
        image: singdata.image,
        name,
        phone,
        date,
        time,
        pools: pool,
        email,
        trainername: trainerdata.name,
        duration,
        amount,
        adminstatus: "pending",
        trainerstatus: "pending",
        login: lid,
        trainer: trainerdata.login,

    };
    // console.log(bookslots);


    const bb = new booking(bookslots);
    await bb.save();
    res.json({ status: "sucessbookslots" });

});


router.get('/viewbooking', async (req, res) => {
    const lid = req.query.lid;

    const data = await booking.find({ login: lid });
    // console.log(data);
    res.json({ data });
});
router.post('/sendrequest_post', async (req, res) => {
    const { trainerid, lid } = req.body;

    try {
        const trainerdata = await trainers.findOne({ _id: trainerid });
        const userdata = await sign.findOne({ login: lid });
        const logdata = await log.findById(lid);


        if (!trainerdata || !userdata || !logdata) {
            return res.status(404).json({ status: "error", message: "Data not found" });
        }

        const formattedTime = new Date(Date.now()).toLocaleTimeString('en-GB'); // 24-hour format

        const requestdata = new request({
            trainer: trainerdata.login,
            image: userdata.image, 
            name: logdata.username,
            requestat: formattedTime, // Store the formatted time
            status: "pending",
            login: lid
        });

        await requestdata.save();

        res.json({ status: "successsendrequest", message: "Request sent successfully" });
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


router.post('/feedback_post', async (req, res) => {
    const lid = req.body.lid;

    
    const logdata = await log.findById(lid);
    const signupdata = await sign.findOne({ login: logdata._id });
    const feedbackdata = {
        rating: req.body.rating,
        feedback: req.body.feedback,
        name: logdata.username,
        image: signupdata.image,
        lid: logdata._id
    }
    const ff = new feedback(feedbackdata);
    await ff.save();
    res.json({ status: "successfeedback" });
});


router.post('/poolrating_post', async (req, res) => {
    const lid = req.body.lid;
    const pid=req.body.pid;
  
    const signdata = await sign.findOne({ login: lid });
    

    const poolratingdata = {
        rating: req.body.rating,
        feedback: req.body.feedback,
        name: signdata.name,
        image: signdata.image,
        login: lid,
        pool:pid
    }

    const savepoolrating = new poolrating(poolratingdata);
    await savepoolrating.save();
    res.json({ status: "successpoolrating" });
   

 
    
    
   

    
    
})

router.get('/getviewratings/:id', async (req, res) => {

  const{id}=req.params;
 
  const data=await poolrating.find({pool:id});
  res.json({ 'data': data });
  
    

});

router.get('/viewcompetition', async (req, res) => {
    const data = await competition.find();
    res.json({ 'data': data });
});

router.get('/viewsession', async (req, res) => {
    const data = await sessions.find();



    res.json({ 'data': data });
});

router.get('/getrequeststatus',async(req,res)=>{
  const lid=req.query.lid;
// console.log(lid);

  const data=await request.find({login:lid});

    res.json({ 'data': data });
});

router.get('/chat', async (req, res) => {

    const id = req.query.id;
    const data = await trainers.findOne({ login: id });
    res.json({ 'data': data });

});
router.post('/sendmsg_post', async (req, res) => {
    const msg = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message
    }
    const data = new chat(msg);
    await data.save();
    res.json({ 'status': "sucessmsg" });
});

router.get('/viewmsg', async (req, res) => {
    const { id1, id2 } = req.query;
    // console.log(id1,id2);

    const data = await chat.find({ $or: [{ sender: id1, receiver: id2 }, { sender: id2, receiver: id1 }] });
    res.json({ 'data': data });
});

router.get('/savepayment',async(req,res)=>{
    const{login,amount,bookingid,status}=req.query;

   await booking.findOneAndUpdate({ _id: bookingid }, { $set: { adminstatus: status, trainerstatus: status } });
    

    const data=await payment({login:login,amount:amount,booking:bookingid,status:status,date:new Date()});
    await data.save();
    res.json({status:"successpayment"});
    
});

router.get('/paymenthistory',async(req,res)=>{
 const lid=req.query.lid;

 const data=await payment.find({login:lid}).populate('login');
 res.json({data});

});

router.get('/getavgrating/:id', async (req, res) => {
   
    const id = req.params.id;
    const data=await poolrating.find({pool:id});

    const totalRatings = data.reduce((total, rating) => total + rating.rating, 0);
    const avgRating = (totalRatings / data.length).toFixed(1);
    console.log(avgRating);
    

    res.json({ 'data': avgRating });

});



module.exports = router;
