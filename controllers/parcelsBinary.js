var mongoose = require("mongoose");
var User = mongoose.model("User");
var Parcel = mongoose.model("Parcel");
var Pathogen = mongoose.model("Pathogen");
var Disease = mongoose.model("Disease");
var Weed = mongoose.model("Weed");
var Observation = mongoose.model("Observation");
var bCrypt = require('bcrypt-nodejs');
var fs = require("fs");

exports.insertPathogen = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var tmpFilePath = req.files.file.path;
    var myFile = fs.readFileSync(tmpFilePath);

    var parcelsArray= req.body.parcels.split(',');
    var name = req.body.username;
    var parcels = stringToIntArray(parcelsArray);
    var password = req.body.password;
    var pathogen = JSON.parse(req.body.pathogen);

    var newPathogen = new Pathogen();
    newPathogen.observationDate = pathogen.observationDate;
    newPathogen.name = pathogen.name;
    newPathogen.comment = pathogen.comment;
    newPathogen.damage = pathogen.damage;
    newPathogen.file = myFile;


    //mongoose.connection.collection("test").insert({a:1, "file": myFile}, function() {
    //    console.log("asd");
    //    mongoose.connection.collection("test").findOne({}, function(error, el) {
    //       console.log(el);
    //
    //        fs.writeFile("./uploads/lol.jpeg", el.file.buffer, function(err) {
    //            if(err) {
    //                return console.log(err);
    //            }
    //
    //            console.log("The file was saved!");
    //        });
    //    });
    //});
    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password)) {

                return res.status(200).send("Password Wrong.");
            }
            var userParcelsArray = getParcelsArray(user.parcels);
            //Check if all parcels belongs to user
            for (var i = 0; i < parcels.length; i++) {
                if (!contains(userParcelsArray, parcels[i])) {
                    return res.status(200).send("Parcel " + parcels[i]+
                        " does not belong to " + user.username + ".");
                }
            }
            for (var i = 0; i < user.parcels.length; i++) {
                if (contains(parcels, user.parcels[i].parcelId)) {
                    user.parcels[i].phatogens.push(newPathogen);
                }
            }
            user.save(function (err) {
                if (err) {
                    console.log(user);
                    return res.status(500).send(err.message);
                }
                else {

                    return res.status(200).send(newPathogen);
                }
            });
        }
        else{

            return res.status(200).send("User " + name + " does not exists.");
        }
    });



};

exports.insertDisease = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var tmpFilePath = req.files.file.path;
    var myFile = fs.readFileSync(tmpFilePath);

    var parcelsArray= req.body.parcels.split(',');
    var name = req.body.username;
    var parcels = stringToIntArray(parcelsArray);
    var password = req.body.password;
    var disease = JSON.parse(req.body.disease);

    var newDisease = new Disease();
    newDisease.observationDate = disease.observationDate;
    newDisease.name = disease.name;
    newDisease.comment = disease.comment;
    newDisease.damage = disease.damage;
    newDisease.file = myFile;


    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password)) {

                return res.status(200).send("Password Wrong.");
            }
            var userParcelsArray = getParcelsArray(user.parcels);
            //Check if all parcels belongs to user
            for (var i = 0; i < parcels.length; i++) {
                if (!contains(userParcelsArray, parcels[i])) {
                    return res.status(200).send("Parcel " + parcels[i]+
                        " does not belong to " + user.username + ".");
                }
            }
            for (var i = 0; i < user.parcels.length; i++) {
                if (contains(parcels, user.parcels[i].parcelId)) {
                    user.parcels[i].diseases.push(newDisease);
                }
            }
            user.save(function (err) {
                if (err) {
                    console.log(user);
                    return res.status(500).send(err.message);
                }
                else {

                    return res.status(200).send(newDisease);
                }
            });
        }
        else{

            return res.status(200).send("User " + name + " does not exists.");
        }
    });

};

exports.insertWeed = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var tmpFilePath = req.files.file.path;
    var myFile = fs.readFileSync(tmpFilePath);

    var parcelsArray= req.body.parcels.split(',');
    var name = req.body.username;
    var parcels = stringToIntArray(parcelsArray);
    var password = req.body.password;
    var weed = JSON.parse(req.body.weed);

    var newWeed = new Weed();
    newWeed.observationDate = weed.observationDate;
    newWeed.name = weed.name;
    newWeed.comment = weed.comment;
    newWeed.damage = weed.damage;
    newWeed.file = myFile;


    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password)) {

                return res.status(200).send("Password Wrong.");
            }
            var userParcelsArray = getParcelsArray(user.parcels);
            //Check if all parcels belongs to user
            for (var i = 0; i < parcels.length; i++) {
                if (!contains(userParcelsArray, parcels[i])) {
                    return res.status(200).send("Parcel " + parcels[i]+
                        " does not belong to " + user.username + ".");
                }
            }
            for (var i = 0; i < user.parcels.length; i++) {
                if (contains(parcels, user.parcels[i].parcelId)) {
                    user.parcels[i].weeds.push(newWeed);
                }
            }
            user.save(function (err) {
                if (err) {
                    console.log(user);
                    return res.status(500).send(err.message);
                }
                else {

                    return res.status(200).send(newWeed);
                }
            });
        }
        else{

            return res.status(200).send("User " + name + " does not exists.");
        }
    });

};

exports.insertObservation = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var tmpFilePath = req.files.file.path;
    var myFile = fs.readFileSync(tmpFilePath);

    var parcelsArray= req.body.parcels.split(',');
    var name = req.body.username;
    var parcels = stringToIntArray(parcelsArray);
    var password = req.body.password;
    var observation = JSON.parse(req.body.observation);

    var newObservation = new Observation();
    newObservation.observationDate = observation.observationDate;
    newObservation.comment = observation.comment;
    newObservation.file = myFile;


    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password)) {

                return res.status(200).send("Password Wrong.");
            }
            var userParcelsArray = getParcelsArray(user.parcels);
            //Check if all parcels belongs to user
            for (var i = 0; i < parcels.length; i++) {
                if (!contains(userParcelsArray, parcels[i])) {
                    return res.status(200).send("Parcel " + parcels[i]+
                        " does not belong to " + user.username + ".");
                }
            }
            for (var i = 0; i < user.parcels.length; i++) {
                if (contains(parcels, user.parcels[i].parcelId)) {
                    user.parcels[i].observations.push(newObservation);
                }
            }
            user.save(function (err) {
                if (err) {
                    console.log(user);
                    return res.status(500).send(err.message);
                }
                else {

                    return res.status(200).send(newObservation);
                }
            });
        }
        else{

            return res.status(200).send("User " + name + " does not exists.");
        }
    });

};


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function stringToIntArray(stringArray){
    var intArray = [];
    for (var i = 0; i < stringArray.length; i++) {
        intArray.push(parseInt(stringArray[i]))
    }
    return intArray;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

function getParcelsArray(parcelsJson){
    var parcelsArray = [];
    for (var i = 0; i < parcelsJson.length; i++) {

        parcelsArray.push(parcelsJson[i].parcelId);
    }
    return parcelsArray;
}