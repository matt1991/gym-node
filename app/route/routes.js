
module.exports = function(context) {
    var bodyParser = require('body-parser'),                        
        path = require('path'),
        swig = require('swig');

    var app = context.app;
    //var userController = require("./api/user");
    //var passport = require("./api/passport");
    //app.use(context.domainMiddleWare);      
    app.use(context.errorhandler);
    app.use(bodyParser.urlencoded({limit: '1mb', extended:true}));
    app.use(bodyParser.json({limit: '1mb'}));   
    app.use(context.cookieParser);
    // app.use(context.session({
    //     resave:true,
    //     saveUninitialized:true,
    //     cookie: { path: '/', httpOnly: false, maxAge: null},
    //     secret: context.sessionKey, 
    //     store: context.sessionStore
    // }));
    
    app.engine('swig', swig.renderFile);
   // app.set('view engine', 'swig');
   // app.set('views', path.join(__dirname, '../views'));    
    app.set('view cache', false);
    swig.setDefaults({ 
        cache: false 
    });
    
    app.use(context.express.static(path.join(__dirname, '../../../public')));
    app.all("/", function (req, res) {    
        res.render('home', {});
    });


    //require('../routes/api/authentication')(context,"/api/authentication");
    //require('../routes/api/user')(context,"/api/user");



    /**
     * Primary app routes.
     */
    // app.get('/login', userController.getLogin);
    // app.post('/login', userController.postLogin);
    // app.get('/logout', userController.logout);
    // app.get('/forgot', userController.getForgot);
    // app.post('/forgot', userController.postForgot);
    // app.get('/reset/:token', userController.getReset);
    // app.post('/reset/:token', userController.postReset);
    // app.get('/signup', userController.getSignup);
    // app.post('/signup', userController.postSignup);
    // app.get('/contact', contactController.getContact);
    // app.post('/contact', contactController.postContact);

    // app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
    // app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
    // app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
    // app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
    // app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

 

    return app;    
};

