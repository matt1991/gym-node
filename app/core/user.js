module.exports = function(context) {
	var User = require('../models/User');

	this.getAllUsers = function (cb) {
		User.find({status:0}, function(err, users) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, users);
			}
		})

	}

	this.getUser = function (id, cb) {
		User.findOne({_id:id}).populate('usercourse').populate('usertrainer').exec(function(err, user) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, user);
			}
		});
	}

	this.createUser = function(user, cb) {
		new User({
			email: user.email,
			password: user.password,
			name: user.name,
			gender: user.gender,
			wechat: user.wechat,
		}).save(function(err, user) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, user);
			}
		});
	}

	this.updateUser = function(user, cb) {
		User.findOne({_id:user._id}, function(err, newUser) {
			if (err) {
				return cb(err);
			} else {
				newUser.name = user.name?:newUser.name;
				newUser.email = user.email?:newUser.email;
				newUser.gender = user.gender?:newUser.gender;
				newUser.wechat = user.wechat?:newUser.wechat;
				newUser.save(function(err, user) {
					if (err) {
						return cb(err);
					} else {
						return cb(null, user);
					}
				});
			}
		});
	}

	this.deleteUser = function(user, cb) {
		User.findOne({_id: user._id?:user}, function(err, user) {
			if (err) {
				return cb(err);
			} else{
				user.status = -1;
				user.save(function(err, user) {
					if (err) {
						return cb(err);
					} else{
						return cb(null, user);
					}
				});
			}
		});
	}

}