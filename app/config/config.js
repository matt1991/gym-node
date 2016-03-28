module.exports = function() { 
	var fs 	   = require('fs'),
		nconf  = require('nconf'),
		xml2js = require('xml2js');
    
	// Read default value
	nconf.defaults({
	
	});	
	
    // Read the configuarion file	
	var opts = { explicitRoot: false, 
				explicitArray: false};
	var str = fs.readFileSync('./app/config/config.xml', {encoding: "utf-8"});
	xml2js.parseString(str, opts, function (err, result) {
		nconf.overrides(result);
	});

    return nconf;
}();