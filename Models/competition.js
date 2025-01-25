const mongo = require('mongoose');
const competitionschema = new mongo.Schema({
    image:String,
    name: String,
    organizer: String,
    date: String,
    venue: String,
    time: String,
    agegroup: String,
    regfee: String,
    contactno: String,
    prize: String,
});
const comp=mongo.model('competition',competitionschema);
module.exports=comp;
