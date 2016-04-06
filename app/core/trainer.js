module.exports = function(context) {
	var Trainer = require('../models/Trainer');

	this.getAllTrainers = function (cb) {
		Trainer.find({status:0}, function(err, trainers) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, trainers);
			}
		})

	}

	this.getTrainer = function (id, cb) {
		Trainer.findOne({_id:id}).populate('gym').exec(function(err, trainer) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, trainer);
			}
		});
	}

	this.createTrainer = function(trainer, cb) {
		new Trainer({
			email: trainer.email,
			password: trainer.password,
			name: trainer.name,
			gender: trainer.gender,
			wechat: trainer.wechat,
			gym: trainer.gym,
		}).save(function(err, trainer) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, trainer);
			}
		});
	}

	this.updateTrainer = function(trainer, cb) {
		Trainer.findOne({_id:trainer._id}, function(err, newTrainer) {
			if (err) {
				return cb(err);
			} else {
				newTrainer.name = trainer.name?:newTrainer.name;
				newTrainer.email = trainer.email?:newTrainer.email;
				newTrainer.gender = trainer.gender?:newTrainer.gender;
				newTrainer.wechat = trainer.wechat?:newTrainer.wechat;
				newTrainer.gym = trainer.gym?:newTrainer.gym;
				newTrainer.save(function(err, trainer) {
					if (err) {
						return cb(err);
					} else {
						return cb(null, trainer);
					}
				});
			}
		});
	}

	this.deleteTrainer = function(trainer, cb) {
		Trainer.findOne({_id: trainer._id?:trainer}, function(err, trainer) {
			if (err) {
				return cb(err);
			} else{
				trainer.status = -1;
				trainer.save(function(err, trainer) {
					if (err) {
						return cb(err);
					} else{
						return cb(null, trainer);
					}
				});
			}
		});
	}

}