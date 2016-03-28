(function() {
    /**
     * Module dependencies.
     */
    var express = require('express');
    var compress = require('compression');
    var session = require('express-session');
    var bodyParser = require('body-parser');
    var logger = require('morgan');
    var errorHandler = require('errorhandler');
    var lusca = require('lusca');
    var MongoStore = require('connect-mongo/es5')(session);
    var flash = require('express-flash');
    var cookieParser = require('cookie-parser');
    var path = require('path');
    var mongoose = require('mongoose');
    var expressValidator = require('express-validator');
    var http = require('http');
    var cluster = require('cluster');
    var setting = require('./app/config/config.js');

    function startHTTPServers() {
        // check the database is initialized or not
        var servers = new Array();

        var errorhandler = function errorhandler(err, req, res, next) {
            console.error(err.stack);
           // emailService.sendSystemAlertNotifications(err.message, err.stack);
            if (err.domain) {
                try {
                    //make sure we close down within 30 seconds
                    var killtimer = setTimeout(function() {
                        process.exit(1);
                    }, 30000);
                    // But don't keep the process open just for that!
                    killtimer.unref();

                    // stop taking new requests.
                    for (var i=0; i < servers.length; i++) {
                        servers[i].close();
                    } 

                    // Let the master know we're dead. This will trigger a
                    // 'disconnect' in the cluster master, and then it will fork
                    // a new worker.
                    cluster.worker.disconnect();

                    // try to send an error to the request that triggered the problem
                    res.statusCode = 500;
                    res.setHeader('content-type', 'text/plain');
                    res.end('Oops, there was a problem!\n');

                } catch (er2) {
                    // oh well, not much we can do at this point.
                    console.error('Error sending 500!', er2.stack);
                }
            }
              
        }

        var httpServerConfig = setting.get('public-server');
        if (httpServerConfig != null) {
            var app = express();
            var httpServer = http.createServer(app);
            servers.push(httpServer);

            var sessionStore = new MongoStore({
                url: httpServerConfig['session-store'],
                autoReconnect: true
              });




            /**
             * Express configuration.
             */
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'jade');
            app.use(compress());
            app.use(logger('dev'));

            app.use(expressValidator());
            app.use(session({
                resave:true,
                saveUninitialized:true,
                cookie: { path: '/', httpOnly: false, maxAge: null},
                secret: "session_id", 
                store: sessionStore
            }));
    

            app.use(flash());
            app.use(function(req, res, next) {
                lusca.csrf()(req, res, next);
            });
            app.use(lusca.xframe('SAMEORIGIN'));
            app.use(lusca.xssProtection(true));
            app.use(function(req, res, next) {
              res.locals.user = req.user;
              next();
            });


            app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

            /**
             * Start Express server.
             */

            var context = {
                app: app,
                cookieParser: cookieParser(httpServerConfig['cookie-secret']),
                errorhandler: errorhandler, 
                express: express,
                mongoose: mongoose,
                session: session,
                sessionKey: 'session_id',
                sessionStore: sessionStore,
                bodyParser:bodyParser,
                //sio: io.listen(httpServer),
                path: path,
            }

            // Initialize Submodule
            require('./app/route/routes')(context);
            //require('./app/public/config/socket_io')(context);

            // Listen ports
            var httpPort = httpServerConfig['http-port'];
            httpServer.listen(httpPort);
            console.log("Public server listens port "+httpPort+".");

        };
    }


    var numCPUS = 1;
    if (cluster.isMaster) {
        for (var i = 0; i < numCPUS; i++) {
            cluster.fork();
        };
        cluster.on('disconnect', function(worker) {
            console.error("disconnect");
            cluster.fork();
        });
        cluster.on('exit', function(worker, code, signal) {
            console.log('worker ' + worker.process.pid  + ' died');
        });
    } else {
        var started = false;

        /**
         * Connect to MongoDB.
         */
        mongoose.connect(setting.get('nosql-database'));

        mongoose.connection.on('error', function() {
          console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
          process.exit(1);
        });
        mongoose.connection.on('connected', function() {
            console.log('Mongoose default connection open to ' + setting.get('nosql-database'));        
            if (!started) {
                startHTTPServers();
                started = true;
            }
        });
        mongoose.connection.on('disconnected', function() {
            console.log('Mongoose default connection disconnected');
        });
        mongoose.connection.on('error',function(err) {
            console.error('Mongoose default connection error: ' + err);
        }); 
        process.on('uncaughtException', function(err) {
            console.error('Caught exception: ' + err.message + '\n' + err.stack);
        });

        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        
    }


}).call(this);

