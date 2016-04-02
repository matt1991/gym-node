module.exports = function(context) {
	var Course = require('../models/Course');

	this.getAllCourses = function (cb) {
		Course.find({status:0}, function(err, courses) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, courses);
			}
		})

	}

	this.getCourse = function (id, cb) {
		Course.findOne({_id:id}, function(err, course) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, course);
			}
		});
	}

	this.createCourse = function(course, cb) {
		let course = new Course({
			name: course.name,
		    weeks: course.weeks,
		    time: course.time,
		    fee: course.fee,
		    days: course.days,
		    lessons: [{ type: Number, ref: 'Lesson'}],
		    gym: { type: Number, ref: 'Gym'},
		    usercourse: [{type: Number, ref:'UserCourse' }]，
		    status: { type: Number, default: 0 },//1 open, 2 closed, 3 finished, -1 delete,
		}).save(function(err, gym) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, gym);
			}
		});
	}

	this.updateCourse = function(course, cb) {
		Course.findOne({_id:course._id}, function(err, newCourse) {
			if (err) {
				return cb(err);
			} else {
				newCourse.name = course.name?:newCourse.name;
				
				
				newCourse.save(function(err, course) {
					if (err) {
						return cb(err);
					} else {
						return cb(null, course);
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