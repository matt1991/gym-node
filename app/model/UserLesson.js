var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var UserLessonSchema = new mongoose.Schema({

    user: { type: Number, ref: 'Uesr'},
    lesson: { type: Number, ref: 'Lesson'},
    status: { type: Number, default: 0}, //1 signed /2 missed
    usercourse: { type: Number, ref: 'UserCourse'},
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var UserLesson = mongoose.model('UserLesson', UserLessonSchema);

module.exports = UserLesson;
