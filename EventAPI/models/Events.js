const mongoose = require('mongoose');

const events = mongoose.Schema({
    Ename:String,
    EDate:Date,
    EChiefName:String,
    EPermission:String,
    EChiefProfile:String,
    EChiefAgenda:String,
    ERequestLetter:String,
    EAttendance:String,
    EFeedback:String,
    EChiefFeedback:String
})

const EventSchema = mongoose.model("Events",events);
module.exports = EventSchema;