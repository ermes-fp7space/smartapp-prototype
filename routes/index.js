//Here the routes for the user managment are defined. It uses the passport middleware
//to check the autentication.

var express = require('express');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport){

    //Login page: GET
    router.get('/', function(req, res) {
        //Login with flash message.
        res.send("Server working!");
    });


    //Login page: POST
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(false);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                var response= '{"user": "' + user.username +
                                '", "email": "' + user.email  + '"}';
                console.log(response)
                var responseJson = JSON.parse(response);
                res.send(responseJson);
            });
        })(req, res, next);
    });

    //Resgister page: POST
    router.post('/signup', function(req, res, next) {
        passport.authenticate('signup', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(false);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                console.log("new USER");
                var response= '{"user": "' + user.username +
                    '", "email": "' + user.email + '"}';
                console.log(response)
                var responseJson = JSON.parse(response);
                res.send(responseJson);
            });
        })(req, res, next);
    });

    ////Login page: POST
    //router.post('/login', passport.authenticate('login'), function(req,res){
    //        res.send(req.user);
    //    });


    ////Login page: POST
    //router.post('/login', passport.authenticate('login', {
    //        //successRedirect: '/home',
    //        //failureRedirect: '/',
    //        //failureFlash: true
    //    })
    //);

    ////SignUp page: GET
    //router.get('/signup', function(req, res){
    //    res.render('users/register',{message: req.flash('message')});
    //});

    ////SignUp page: POST
    //router.post('/signup', passport.authenticate('signup', {
    //    successRedirect: '/home',
    //    failureRedirect: '/signup',
    //    failureFlash : true
    //}));

    ///* Homepage: GET */
    //router.get('/home', isAuthenticated, function(req, res){
    //    res.render('users/home', { user: req.user });
    //});
    //
    ///* Logout*/
    //router.get('/signout', function(req, res) {
    //    req.logout();
    //    res.redirect('/');
    //});

    return router;
}
