module.exports = function(context) {
	var Lesson = require('../models/Lesson');
	var async = require('async');

	function calculateDates(course, weeks, cb) {
		var results = new Array();
		for (var i = 0; i < weeks; i++) {
			for (var j = 0; j < course.days.length; j++) {
				var day = course.days[j];
				var startTime = new Date();
				var endTime = new Date();
				var now = new Date();
				var date = day + i*7 - now.getDay();

				startTime.setDate(startTime.getDate() + date);
				startTime.setHours(course.startTime.getHours());
				startTime.setSeconds(course.startTime.getSeconds);

				endTime.setDate(endTime.getDate() + date);
				endTime.setHours(course.endTime.getHours());
				endTime.setSeconds(course.endTime.getSeconds);

				if (startTime - now > 0) {
					results.push({
						startTime:startTime,
						endTime:endTime
					});
				}
			}
		}

		cb(null, results);
	}		


	this.createLessons = function(course, weeks, cb) {
		calculateDates(course, weeks, function(err, results) {
			async.eachSeries(results, function(date, callback) {
				new Lesson({
					name: "Lesson",
				    startTime: date.startTime,
				    endTime: date.endTime,
				    status: 1,//1 open, 2 closed, 3 finished, -1 delete,
				}).save(function(err, lesson) {
					callback(err, lesson);
				});
			}, function(err, lessons) {
				cb(err, lessons);
			});
		})
	}

	this.deleteLessons = function(course, cb) {
		Lesson.update({course:course.id?:course}, { $set: { status: -1 } }, {multi:true}, function(err, lessons) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, lessons);
			}
		});
	}


	this.getLessons = function(course, cb) {
		Lesson.find({course:course.id?:course}, function(err, lessons) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, lessons);
			}
		});
	}



} 