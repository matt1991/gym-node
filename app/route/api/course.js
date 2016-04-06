var courseCore = require('../../core/course');

/**
 * GET /gyms/:gid/courses
 * Get all courses of some gym.
 */
exports.getCoursesByGym = function (req, res) {
 	courseCore.getCoursesByGym(req.params.gid, function(err, courses) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).send({
				size:courses.length,
				courses: courses
			});
		}
	});
}

/**
 * GET /gyms/:gid/courses/cid
 * Get a course.
 */
exports.getCourseById = function (req, res) {
 	courseCore.getCourse(req.params.cid, function(err, course) {
		if (err) {
			res.status(400).send(err);
		} else if (course) {
			res.status(200).send(course);
		} else {
			res.status(404);
		}
	});
}




