var gymCore = require('../../core/gym');


/**
 * GET /gyms
 * Get all gyms.
 */
exports.getGyms = function (req, res) {
 	gymCore.getAllGyms(function(err, gyms) {
 		if (err) {
 			res.status(400).send(err);
 		} else {
 			res.status(200).send({
 				size: gyms.length,
 				gyms: gyms
 			});
 		}
 	});
}


/**
 * GET /gyms/:gid
 * Get a gym info.
 */

exports.getGym = function (req, res) {
	gymCore.getGym(req.params.gid, function(err, gym) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).send(gym);
		}
	});
}




