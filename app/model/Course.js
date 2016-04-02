
var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({

    name: { type: String, default: '' },
    weeks: {type: Number, default: 0 },
    time: { type: String, default: '19:00 - 21:00' },
    fee: { type: Number, default: 200 },
    days: [{ type: Number }],
    lessons: [{ type: Number, ref: 'Lesson'}],
    gym: { type: Number, ref: 'Gym'},
    usercourse: [{type: Number, ref:'UserCourse' }]，
    status: { type: Number, default: 0 },//1 open, 2 closed, 3 finished, -1 delete,
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
