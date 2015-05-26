//Imports
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    ip = require("ip"),
    parcelModel = require("./models/parcel")(app, mongoose),
    userModel = require("./models/user")(app, mongoose),
    ParcelsController = require("./controllers/parcels"),
    UsersController = require("./controllers/users"),
    dbConfig = require("./controllers/db.js"),
    passport = require("passport"),
    expressSession = require("express-session"),
    path = require("path");

//BBDD Conection and importing Models.
mongoose.connect(dbConfig.url, function(err, res){
    if(err) console.log ('ERROR connecting to: ' + dbConfig.url + '. ' + err);
    console.log('Connected to: ' + dbConfig.url);
});

//Shows JSON pretty.
app.set('json spaces', 3);

// Tools to use in the APP
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//To render HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride());
//Code to configure passport. The module to handle the autentication.
app.use(expressSession({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true}));
app.use(passport.initialize());

app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

//Using flash to store messages and display templates.
var flash = require('connect-flash');
app.use(flash());

//Routes for user managment
var routes = require('./routes/index')(passport);
app.use('/', routes);

//Parcels API Routes
var parcelsApiRoute = "/parcels";
var parcelsApi = express.Router();
parcelsApi.route(parcelsApiRoute)
    .get(ParcelsController.findAllParcels)
    .post(ParcelsController.addParcel);
parcelsApi.route(parcelsApiRoute + '/:parcelId')
    .get(ParcelsController.findParcelById)
    .put(ParcelsController.updateParcel)
    .delete(ParcelsController.deleteParcel);
app.use('/api', parcelsApi);


//Users API Routes
var usersApiRoute = "/users";
var usersApi = express.Router();
usersApi.route(usersApiRoute)
    .post(UsersController.insertParcelsInUser);
usersApi.route(usersApiRoute + '/:username')
    .get(UsersController.findUserByName);
app.use('/api', usersApi);


////Users API Routes
//var usersApiRoute = "/users";
//var usersApi = express.Router();
//usersApi.route(usersApiRoute)
//    .get(UsersController.findAllUsers);
//usersApi.route(usersApiRoute + '/:username')
//    .get(UsersController.findUserByName);
//app.use('/api', usersApi);

//
var theport = process.env.PORT || 3030;

//Start to listen.
app.listen(theport, function(){
    console.log("Node Server Started On Port" + theport);});
