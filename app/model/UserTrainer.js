var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var UserTrainerSchema = new mongoose.Schema({

    user: { type: Number, ref: 'Uesr'},
    trainer: { type: Number, ref: 'Trainer'},
    startTime: [{ type: Date, default: Date.now }],
    endTime: [{ type: Date, default: Date.now }],
    status: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var UserTrainer = mongoose.model('UserTrainer', UserTrainerSchema);

module.exports = UserTrainer;
