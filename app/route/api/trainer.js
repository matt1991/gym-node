var trainerCore = require('../../core/trainer');

/**
 * GET /gyms/:gid/trainers
 * Get all trainers of some gym.
 */
exports.getTrainersByGym = function (req, res) {
 	trainerCore.getTrainersByGym(req.params.gid, function(err, trainers) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).send({
				size:trainers.length,
				trainers: trainers
			});
		}
	});
}


/**
 * GET /gyms/:gid/trainers/tid
 * Get a trainer.
 */
exports.getTrainerById = function (req, res) {
 	trainerCore.getTrainerById(req.params.tid, function(err, trainer) {
		if (err) {
			res.status(400).send(err);
		} else if (trainer) {
			res.status(200).send(trainer);
		} else {
			res.status(404);
		}
	});
}




