module.exports = function(context) {
	var Gym = require('../models/Gym');

	this.getAllGyms = function (cb) {
		Gym.find({status:0}, function(err, gyms) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, gyms);
			}
		})

	}

	this.getGym = function (id, cb) {
		Gym.findOne({_id:id}, function(err, gym) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, gym);
			}
		});
	}

	this.createGym = function(gym, cb) {
		new Gym({
			name: gym.name,
			address: gym.address,
    		tel: gym.tel,
    		decs: gym.decs
		}).save(function(err, gym) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, gym);
			}
		});
	}

	this.updateGym = function(gym, cb) {
		Gym.findOne({_id:gym._id}, function(err, newGym) {
			if (err) {
				return cb(err);
			} else {
				newGym.name = gym.name?:newGym.name;
				newGym.address = gym.address?:newGym.address;
				newGym.tel = gym.tel?:newGym.tel;
				newGym.decs = gym.decs?:newGym.decs;
				newGym.save(function(err, gym) {
					if (err) {
						return cb(err);
					} else {
						return cb(null, gym);
					}
				});
			}
		});
	}

	this.deleteGym = function(gym, cb) {
		Gym.findOne({_id: gym._id?:gym}, function(err, gym) {
			if (err) {
				return cb(err);
			} else{
				gym.status = -1;
				gym.save(function(err, gym) {
					if (err) {
						return cb(err);
					} else{
						return cb(null, gym);
					}
				});
			}
		});
	}

}