module.exports = function(context) {
	var Course = require('../models/Course');
	var LessonCore = require('./core/lesson');
	var UserCourseCore = require('./core/usercourse');

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
		new Course({
			name: course.name,
		    weeks: course.weeks,
		    startTime:course.startTime,
		    endTime:course.endTime,
		    fee: course.fee,
		    days: course.days,
		    gym: course.gym,
		    status: 1,//1 open, 2 closed, 3 finished, -1 delete,
		}).save(function(err, course) {
			if (err) {
				return cb(err);
			} else {
				LessonCore.createLessons(course, 2, function(err, lessons) {
					if (err) {
						return cb(err);
					} else {
						course.lessons = lessons;
						course.save(function(err, course) {
							if (err) {
								return cb(err);
							} else {
								cb(null, course);
							}
						});
					}
				});
			}
		});
	}

	this.updateCourse = function(course, cb) {
		Course.findOne({_id:course._id}, function(err, newCourse) {
			if (err) {
				return cb(err);
			} else {
				newCourse.name = course.name?:newCourse.name;
				newCourse.weeks = course.weeks?:newCourse.weeks;
				newCourse.time = course.time?:newCourse.time;
				newCourse.fee = course.fee?:newCourse.fee;
				newCourse.days = course.days?:newCourse.days;
				newCourse.lessons = course.lessons?:newCourse.lessons;
				newCourse.gym = course.gym?:newCourse.gym;
				newCourse.usercourse = course.usercourse?:newCourse.usercourse;
				newCourse.status = course.status?:newCourse.status;
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

	this.deleteCourse = function(course, cb) {
		Course.findOne({_id: course._id?:course}, function(err, course) {
			if (err) {
				return cb(err);
			} else{
				course.status = -1;
				LessonCore.deleteLessons(course._id, function(err, lessons) {
					if (err) {
						return cb(err);
					} else {
						UserCourseCore.deleteUserCourse(course._id, function(err, usercourses) {
							if (err) {
								return cb(err);
							} else {
								course.save(function(err, course) {
									if (err) {
										return cb(err);
									} else{
										return cb(null, course);
									}
								});
							}
						});
					}
				});
			}
		});
	}

} 