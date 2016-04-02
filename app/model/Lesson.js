
var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var LessonSchema = new mongoose.Schema({

    name: { type: String, default: '' },
    decs: { 
        id: ObjectId,
        pic: { type: String, default: '' },
        decs: { type: String, default: '' }
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    trainer: { type: Number, ref: 'Trainer' },
    status: { type: Number, default: 0 },//1 open, 2 closed, 3 finished, -1 delete,
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
