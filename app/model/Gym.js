
var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var GymSchema = new mongoose.Schema({

    name: { type: String, default: '' },
    address: { type: String, default: '' },
    tel: { type: String, default: '' },
    decs: [{ 
        id: ObjectId,
        pic: { type: String, default: '' },
        decs: { type: String, default: '' }
    }],
    status: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });


var Gym = mongoose.model('Gym', GymSchema);

module.exports = Gym;
