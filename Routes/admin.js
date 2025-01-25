const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require('../Config/db');
const log = require('../Models/login');
const pool = require('../Models/pools');
const trainers = require('../Models/trainerdetails');
const sign = require('../Models/signup');
const feedback = require('../Models/feedback');
const complaint = require('../Models/complaints');
const booking = require('../Models/booking');
const comp=require('../Models/competition');
const payment=require('../Models/payments');
db();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg")
    }
});

const upload = multer({ storage: storage });

const app = express();




router.post('/login_post', async (req, res) => {
    // const name = 'admin';
    // const pass = 'admin';

    const username = req.body.Username;
    const password = req.body.password;
    const data = await log.findOne({ username: username, password: password })
    if(data){
        if (data.type === 'admin') {

            res.json({ 'status': "sucessadmin", 'lid': data._id });
        }
    
        else if (data.type === 'user') {
            res.json({ 'status': 'successuser', 'lid': data._id })
        }
    
        else if (data.type === 'trainer') {
            res.json({ 'status': 'successtrainer', 'lid': data._id })
            
            
        }
      
    }
    else {
        res.json({ 'status': 'no'});
    }
});

router.post('/changepass_post', async (req, res) => {
    const id = req.body.id;
    const newpass ={
        password: req.body.password
    }
    await log.findOneAndUpdate({ _id: id },{$set:newpass});
    res.json({ 'status': "sucesschangepass" });
});
router.post('/addpool_post', upload.single('image'), async (req, res) => {
    const addpool = {
        Image: req.file.filename,
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        description: req.body.description,
        length: req.body.length,
        width: req.body.width,
        depth: req.body.depth,
        contact: req.body.contact,
        status: req.body.status
    }


    const pooldata = new pool(addpool);
    await pooldata.save();
    res.json({ 'status': "sucessaddpool" });

})
router.get('/getpools', async (req, res) => {
    const data = await pool.find();
    res.json({ 'data': data });
})

router.get('/deletepool', async (req, res) => {
    const id = req.query.id;

    await pool.deleteOne({ _id: id });


    res.json({ 'status': "sucessdeletepool" });


})

router.post('/editpool_post', upload.single('image'), async (req, res) => {




    const editpool = {

        name: req.body.name,
        location: req.body.location,
        status: req.body.status
    }
    if (req.file) {
        editpool.image = req.file.filename;
    }



    await pool.findOneAndUpdate({ _id: req.body.id }, { $set: editpool });

    res.json({ 'status': "sucesseditpool" });
});
router.get('/gettrainers', async (req, res) => {
    const data = await trainers.find();
    res.json({ 'data': data });
});
router.get('/deletetrainer', async (req, res) => {
    const id = req.query.id;
    await trainers.deleteOne({ _id: id });
    res.json({ 'status': "sucessdeletetrainer" });
});

router.post('/edittrainer_post', upload.single('image'), async (req, res) => {
    const edit = {
        image: req.file.filename,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age

    }
    await trainers.findOneAndUpdate({ _id: req.body.id }, { $set: edit });
    res.json({ 'status': "sucessedittrainer" });

})
router.get('/getusers', async (req, res) => {
    const data = await sign.find().populate('login');
    res.json({ 'data': data });
});

router.get('/deleteuser', async (req, res) => {
    const id = req.query.id;
    await sign.deleteOne({ _id: id });
    res.json({ 'status': "sucessdeleteuser" });
});
router.get('/getreviews', async (req, res) => {
    const data = await feedback.find();
    res.json({ 'data': data });

});
router.get('/getcomplaints', async (req, res) => {
    const data = await complaint.find();
    res.json({ 'data': data });
});

router.post('/reply_post', async (req, res) => {
    
    await complaint.findOneAndUpdate({ _id: req.body.id }, { $set: {reply: req.body.reply} });
    res.json({ 'status': "sucessreply" });
});
router.get('/getslots',async(req,res)=>{
   const data = await booking.find();
    res.json({ 'data': data });
});

router.post('/acceptbooking_post', async (req, res) => {
    const { id, adminstatus } = req.body;
      const updatedBooking = await booking.findByIdAndUpdate( id, { adminstatus }, { new: true } );
      res.json({ 'status': "sucessacceptbooking" });
  });


router.post('/addcompetition_post', upload.single('compimage'), async (req, res) => {



    const addcomp={
        image:req.file.filename,
        name: req.body.compname,
        organizer: req.body.organizer,
        date:req.body.date,
        venue:req.body.venue, 
        time: req.body.checkin,
        agegroup: req.body.agegroup,
        regfee: req.body.regfee,
        contactno: req.body.contactno,
        prize: req.body.prize,
        
    }


    console.log(addcomp);

    const data=new comp(addcomp);
    await data.save();
    res.json({ 'status': "sucessaddcompetition" });

})  

router.get('/getcompetitions', async (req, res) => {
    const data=await comp.find();
    res.json({ 'data': data });
});

router.get('/getcompetition', async (req, res) => {
    const id = req.query.id;
    
    const data = await comp.findOne({ _id: id });
    
    res.json({ 'data': data });
})
router.post('/editcompetition_post', upload.single('compimage'), async (req, res) => {
    const id = req.body.id;
    const edit = {
        name: req.body.compname,
        organizer: req.body.organizer,
        date: req.body.date,
        venue: req.body.venue,
        time: req.body.checkin,
        agegroup: req.body.agegroup,
        regfee: req.body.regfee,
        contactno: req.body.contactno,
        prize: req.body.prize,
    };
    
    if (req.file) {
        edit.image = req.file.filename;
    }
    
    const result = await comp.findOneAndUpdate({ _id: id }, { $set: edit }, { new: true });
    res.json({ status: 'sucesseditcomp', competition: result });
});


  router.get('/deletecomp', async (req, res) => {
    const id = req.query.id;
    await comp.deleteOne({ _id: id });
    res.json({ 'status': "sucessdeletecomp" });
  });
  router.get('/getusercount', async (req, res) => {

        const userCount = await sign.countDocuments();
        res.json({ data: userCount });
   
});
router.get('/gettrainercount', async (req, res) => {

    const trainerCount = await trainers.countDocuments();
    res.json({ data: trainerCount });
});
router.get('/getcompcount', async (req, res) => {

    const compCount = await complaint.countDocuments();
    res.json({ data: compCount });
});

router.get('/getfeedcount', async (req, res) => {

    const feedCount = await feedback.countDocuments();
    res.json({ data: feedCount });
});
router.get('/getpoolcount', async (req, res) => {

    const poolCount = await pool.countDocuments();
    res.json({ data: poolCount });
});
router.get('/getbookingscount',async(req,res)=>{

    const bookingCount = await booking.countDocuments();
    res.json({ data: bookingCount });
});

router.get('/gettrainers',async(req,res)=>{
    const data = await trainers.find();
     res.json({ 'data': data });
 });
 router.get('/paymentdetails',async(req,res)=>{
    const data = await payment.find().populate('login');
     res.json({ 'data': data });
 });

module.exports = router;
