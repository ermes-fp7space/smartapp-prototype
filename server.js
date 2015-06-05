//Imports
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    ip = require("ip"),
    observationModel = require("./models/observation")(app, mongoose),
    weedModel = require("./models/weed")(app, mongoose),
    diseaseModel = require("./models/disease")(app, mongoose),
    pathogenModel = require("./models/pathogen")(app, mongoose),
    phenologyModel = require("./models/phenology")(app, mongoose),
    agrochemicalModel = require("./models/agrochemical")(app, mongoose),
    fertilizerModel = require("./models/fertilizer")(app, mongoose),
    irrigationInfoModel = require("./models/irrigationInfo")(app, mongoose),
    yieldModel = require("./models/yield")(app, mongoose),
    cropInfoModel = require("./models/cropInfo")(app, mongoose),
    parcelStatusModel = require("./models/parcelStatus")(app, mongoose),
    soilModel = require("./models/soil")(app, mongoose),
    parcelModel = require("./models/parcel")(app, mongoose),
    userModel = require("./models/user")(app, mongoose),
    ParcelsController = require("./controllers/parcels"),
    ParcelsBinaryController = require("./controllers/parcelsBinary"),
    UsersController = require("./controllers/users"),
    dbConfig = require("./controllers/db.js"),
    passport = require("passport"),
    expressSession = require("express-session"),
    path = require("path"),
    multer  = require('multer');

//BBDD Conection and importing Models.
mongoose.connect(dbConfig.url, function(err, res){
    if(err) console.log ('ERROR connecting to: ' + dbConfig.url + '. ' + err);
    console.log('Connected to: ' + dbConfig.url);
});

//Shows JSON pretty.
app.set('json spaces', 3);

// Tools to use in the APP
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(multer({
    dest: './uploads/',
    //onFileUploadComplete: function(file, req, res) {
    //    console.log("FILEEEE: " + file);
    //}
}));

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
//parcelsApi.route(parcelsApiRoute)
//    .get(ParcelsController.findAllParcels)
//    .post(ParcelsController.addParcel);
parcelsApi.route(parcelsApiRoute + '/soil')
    .post(ParcelsController.insertSoil);
parcelsApi.route(parcelsApiRoute + '/parcelStatus')
    .post(ParcelsController.insertParcelStatus);
parcelsApi.route(parcelsApiRoute + '/cropInfo')
    .post(ParcelsController.insertCropInfo);
parcelsApi.route(parcelsApiRoute + '/yield')
    .post(ParcelsController.insertYield);
parcelsApi.route(parcelsApiRoute + '/irrigationInfo')
    .post(ParcelsController.insertIrrigationInfo);
parcelsApi.route(parcelsApiRoute + '/fertilizer')
    .post(ParcelsController.insertFertilizer);
parcelsApi.route(parcelsApiRoute + '/agrochemical')
    .post(ParcelsController.insertAgrochemical);
parcelsApi.route(parcelsApiRoute + '/phenology')
    .post(ParcelsController.insertPhenology);
parcelsApi.route(parcelsApiRoute + '/pathogen')
    .post(ParcelsBinaryController.insertPathogen);
parcelsApi.route(parcelsApiRoute + '/disease')
    .post(ParcelsBinaryController.insertDisease);
parcelsApi.route(parcelsApiRoute + '/weed')
    .post(ParcelsBinaryController.insertWeed);
parcelsApi.route(parcelsApiRoute + '/observation')
    .post(ParcelsBinaryController.insertObservation);
    //.put(ParcelsController.updateParcel)
    //.delete(ParcelsController.deleteParcel);
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
var theport = process.env.PORT || 6585;

//Start to listen.
app.listen(theport, function(){
    console.log("Node Server Started On Port: " + theport);});
