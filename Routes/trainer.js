const express = require('express');
const router = express.Router();
const db = require('../Config/db');
db();
const trainer = require('../Models/trainerdetails');
const log = require('../Models/login');
const booking = require('../Models/booking');
const request = require('../Models/requests');
const session = require('../Models/Session');
const sign = require('../Models/signup');

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


router.get('/trainer', (req, res) => {
    res.send('hello trainer');
});
router.post('/addtrainer_post', upload.single('image'), async (req, res) => {

    const login = {
        username: req.body.username,
        password: req.body.password,
        type: "trainer"
    }
    const logdata = new log(login);
    await logdata.save();


    const addtrainer = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
        image: req.file.filename,
        qualification: req.body.qualification,
        skills: req.body.skills,
        experience: req.body.experience,
        login: logdata._id
    }
    const data = new trainer(addtrainer);
    await data.save();
    res.json({ status: "signupsuccess" });


});

router.get('/trainerprofile', async (req, res) => {
    const lid = req.query.lid;
    console.log(lid);

    const data = await trainer.findOne({ login: lid }).populate('login');
    res.json({ data: data });
});

router.get('/getschedule', async (req, res) => {
    const lid = req.query.lid;

    const data = await booking.find({ trainer: lid }).populate('login');


    res.json({ data: data });
});

router.get('/gettrainerbookings', async (req, res) => {
    const lid = req.query.lid;


    const data = await booking.find({ trainer: lid }).populate('login');


    res.json({ 'data': data });
});
router.post('/acceptbooking_post', async (req, res) => {
    const { id, trainerstatus } = req.body;


    const updatedBooking = await booking.findByIdAndUpdate(id, { trainerstatus }, { new: true });
    res.json({ 'status': "sucessacceptbooking" });
});

router.get('/viewrequest', async (req, res) => {
    const lid = req.query.lid;
    

    const data = await request.find({ trainer: lid }).populate('login');


    res.json({ data: data });


});

router.post('/acceptrequest_post', async (req, res) => {
    const { id, status } = req.body;

    const acceptrequest = await request.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ status: "success", data: acceptrequest });

});

router.post('/changepass_post', async (req, res) => {
    const { id, newPassword } = req.body;

    await log.findOneAndUpdate({ _id: id }, { $set: { password: newPassword } });
    res.json({ status: "success" });
});
router.get('/trainerdetails', async (req, res) => {
    const trainerdata = await trainer.findOne({ login: req.query.lid });
    res.json({ trainerdata: trainerdata });
})
router.post('/addsession_post', async (req, res) => {

    const { name, phone, image, fromtime, totime, date, lid } = req.body;

    const trainerdata = await trainer.findOne({ login: lid });
    const newsession = {
        login: lid,
        trainer: trainerdata._id,
        name,
        phone,
        image: trainerdata.image,
        fromtime,
        totime,
        date,
    };

    const data = new session(newsession);
    await data.save();

    res.json({ status: "successaddsession" });

});


router.get('/viewsession', async (req, res) => {
    const lid = req.query.lid;
    const data = await session.find({ login: lid });
    res.json({ data: data });
});


router.get('/editsession', async (req, res) => {
    const id = req.query.id;
    const data = await session.findOne({ _id: id });
    res.json({ data: data });
});

router.post('/editsession_post', async (req, res) => {
    const id = req.body.id;

    const edit = {
        date: req.body.date,
        fromtime: req.body.fromtime,
        totime: req.body.totime
    }
    const result = await session.findOneAndUpdate({ _id: id }, { $set: edit }, { new: true });
    res.json({ status: "successeditsession" });
});

router.get('/deletesession', async (req, res) => {
    const id = req.query.id;
    await session.deleteOne({ _id: id });
    res.json({ 'status': "sucessdeletesession" });
});

router.get('/view_user', async (req, res) => {
    const id = req.query.id;
    const data = await sign.findOne({ login: id });
    res.json({ data: data });
})


module.exports = router;