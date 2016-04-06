var userCore = require('../../core/user');
var lessonCore = require('../../core/lesson');
var trainerCore = require('../../core/trainer');
var util = require('util');

/**
 * GET /users/:uid
 * Get a user.
 */

exports.getUserById = function(req, res) {

	req.assert('uid', 'Invalid params').isInt();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).send('There have been validation errors: ' + util.inspect(errors));
	}

    userCore.getUser(req.params.uid, function(err, user) {
        if (err) {
            res.status(400).send(err);
        } else if (user) {
            res.status(200).send(user);
        } else {
            res.status(404);
        }
    });
}

/**
 * GET /courses/:cid/register
 * sgin a lesson.
 * "result": 1,// 1成功， 2 failed ， 3 没有余额 4 已经过了注册时间
 */

 exports.registerCourse = function(req, res) {

 	req.assert('cid', 'Invalid params').isInt();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).send('There have been validation errors: ' + util.inspect(errors));
	}

    userCore.registerCourse(req.params.uid, req.params.cid, function(err, usercourse) {
        if (err) {
            res.status(400).send(err);
        } else if (usercourse) {
            res.status(200).send({
            	result: 1,
            	usercourse:usercourse
			});
     	} else {
     		res.status(200).send({
     			result: 2
     		});
     	}
    });
}

/**
 * GET /lessons/:lid/sign
 * sgin a lesson.
 "result": 1,// 1成功， 2 没有注册课程， 3 课程还没开始 4 课程已经结束
 */

exports.signLesson = function(req, res) {

	req.assert('lid', 'Invalid params').isInt();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).send('There have been validation errors: ' + util.inspect(errors));
	}

	lessonCore.getLeeson(req.params.lid, function(err, lesson) {
		if (err) {
			res.status(400);
		} else if (lesson) {
			var now = new Date;
			var result = {};
			if (lesson.endTime < now) {
				result.result = 4;
			} else if (lesson.startTime > now) {
				result.result = 3;
			} else {
				userCore.signLesson(req.sesson.uid, req.params.lid, function(err, userlesson) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.status(200).send(userlesson);
					}
				});
			}
		} else {
			res.status(404);
		}
	});
}

/**
 * Post /trainers/:tid/book
 * make a booking.
 * body:{startTime:123421341234, endTime:21341234123}
 * "result": 1,// 1成功， 2 预约时间无效
 */

exports.bookTrainer = function(req, res) {
	req.assert('startTime', 'Invalid params').isInt();
	req.assert('endTime', 'Invalid params').isInt();
	req.assert('tid', 'Invalid params').isInt();
	var errors = req.validationErrors();

	if (errors) {
		return res.status(400).send('There have been validation errors: ' + util.inspect(errors));
	}

	trainerCore.checkAvailable(req.body.startTime, req.body.endTime, function(err, isAvailable) {
		if (err) {
			res.status(400);
		} else if (true) {}
	});
}

/**
 * GET /trainers/:lid/sign
 * sign a booking with trainer.
 */

exports.getUserById = function(req, res) {
    userCore.getUser(req.params.uid, function(err, user) {
        if (err) {
            res.status(400).send(err);
        } else if (user) {
            res.status(200).send(user);
        } else {
            res.status(404);
        }
    });
}