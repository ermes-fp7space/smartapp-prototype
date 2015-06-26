//This controller contains the code of the USER REST services.
//It recieves the petition and the params and makes the operations.
//It is using the "User" model, so the operations will be stored in the "users" collection.
//Mongoose makes this automatically in a smart Way.

var mongoose = require("mongoose");
var User = mongoose.model("User");
var LastPosition = mongoose.model("LastPosition");
var Parcel = mongoose.model("Parcel");
var Soil = mongoose.model("Soil");
var response = null;
var bCrypt = require('bcrypt-nodejs');
//GET -  Return all users in DataBase
exports.findAllUsers = function(req, res){
    User.find(function(err, users){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(users);
    });
};

//GET - Return a User with specified username.

exports.insertLastPosition = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var name = req.body.username;
    var password = req.body.password;

    var position = JSON.parse(req.body.position);




    User.findOne({'username': name}, function (err, user) {

        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
            console.log(user);
            user.lastPosition.lastX = position.lastX;
            user.lastPosition.lastY = position.lastY;
            user.lastPosition.zoom = position.zoom;
            user.lastPosition.spatialReference = position.spatialReference;




            user.save(function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                else {

                    return res.status(200).send("OK");
                }
            });
        }
        else return res.status(200).send("User " + name + " does not exists.");
    });
};

exports.findUserByName = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var name = req.params.username;
    User.findOne({'username': name}, { _id: 0, username: 1, email: 1, parcels: 1 , region: 1, profile: 1}, function (err, user) {

        if (err) return res.send(500, err.message);
        if (user) {
            res.status(200).jsonp(user);
        }
        else {
            res.status(200).jsonp("User " + name + " does not exists.");
        }
    });
};

exports.findShortUserByName = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var name = req.params.username;
    User.findOne({'username': name}, { _id: 0, username: 1, email: 1, parcels: 1 , region: 1, lastPosition: 1, profile: 1}, function (err, user) {
        if (err) return res.send(500, err.message);



        if (user) {
            var responseParcels = [];
            var userParcels = user.parcels;
            for(var j = 0; j < userParcels.length; j++) {
                responseParcels.push(userParcels[j].parcelId);
            }
            //console.log("RESPONSE PARCELS NORMAL: " + responseParcels);

            //responseParcelsString = responseParcels.toString();
            //console.log("RESPONSE PARCELS STRING: " + responseParcelsString);
            var responseText= '{"user": "' + user.username +
                '", "email": "' + user.email +
                '", "region": "' + user.region +
                '", "profile": "' + user.profile +
                '", "lastPosition": ' +
                '{"spatialReference": "' + user.lastPosition.spatialReference +
                '", "lastX": "' + user.lastPosition.lastX +
                '", "lastY": "' + user.lastPosition.lastY +
                '", "zoom": "' + user.lastPosition.zoom + '"}' +
                ', "parcels": "'+ responseParcels + '"}';


            //return response.status(200).send(responseJson);
            //console.log("RESPONSE_JSON: " + responseText);
            var responseJson = JSON.parse(responseText);
            res.status(200).jsonp(responseJson);
        }
        else {
            res.status(200).jsonp("User " + name + " does not exists.");
        }
    });
};

exports.insertParcelsInUser = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var name = req.body.username;
    console.log(req.body);
    response = res;
    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if (user) {
			if(req.body.parcels!=undefined)
				var newParcels = req.body.parcels;
			else var newParcels = [];

            if(!isValidPassword(user, req.body.password)){

                return res.status(200).send("Password Wrong.");
            }

            getUsedParcels(user, newParcels);
        }
        else {
            return res.status(200).send("User " + name + " does not exists.");
        }
    });
};

function getUsedParcels(user, newPacels){

    User.find({},{"_id": 0, "parcels.parcelId": 1}, function(err, parcels){
        var totalOwnedParcels = [];
        for(var i = 0; i < parcels.length; i++) {

            var userParcels = parcels[i].parcels;

            for(var j = 0; j < userParcels.length; j++) {
               totalOwnedParcels.push(userParcels[j].parcelId);
            }
        }
        console.log("ParcelasTotales: " + totalOwnedParcels);
        getPreviousUserParcels(user, totalOwnedParcels, newPacels);
    });
}

function getPreviousUserParcels(user, totalOwnedParcels, newPacels){

    User.findOne({username: user.username}, function(err, user){
        var previousOwnedParcels = [];
            var userParcels = user.parcels;
            for(var j = 0; j < userParcels.length; j++) {
                    previousOwnedParcels.push(userParcels[j].parcelId);
            }
        console.log("Mis Parcelas: " + previousOwnedParcels);
        differenceBetweenArrays(totalOwnedParcels, previousOwnedParcels, user, newPacels);
    });
}

function differenceBetweenArrays(bigArray, smallArray, user, newPacels){
    var difference = []

    for(var i=0;i<bigArray.length;i++){

        if(!contains(smallArray,bigArray[i])){

            difference.push(bigArray[i]);
        }
    }

    updateUserParcels(user, difference, newPacels);
}

function updateUserParcels(user, usedParcels, newParcels){

    console.log("Used Parcels: " + usedParcels);
    console.log("New Parcels: " + newParcels);

    //UNCOMMENT TO CHECK IF USER SELECT PARCEL OWNED BY OTHERS
    //for(var i = 0; i < newParcels.length; i++){
    //    if(contains(usedParcels, newParcels[i])){
    //        response.status(200).send("ParcelsUsed");
    //        return;
    //    }
    //}
	
    user.parcels = [];
		for(var i = 0; i < newParcels.length; i++){
			var p = newParcels[i];
			//if(isInt(p)){
            var newParcel = new Parcel();
            newParcel.parcelId = p;
            user.parcels.push(newParcel);
			//}
		}
	
    user.save(function (err) {
        if (err){
            return response.status(500).send(err.message);
        }
        else{
            var responseText= '{"user": "' + user.username +
                '", "email": "' + user.email + '"}';
            var responseJson = JSON.parse(responseText);
            return response.status(200).jsonp(responseJson);
        }
    });
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}
