var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var UserCourseSchema = new mongoose.Schema({

    user: { type: Number, ref: 'Uesr'},
    course: { type: Number, ref: 'Course'},
    userlesson: [{ type: Number, ref: 'UserLesson'}],
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var UserCourse = mongoose.model('UserCourse', UserCourseSchema);

module.exports = UserCourse;
