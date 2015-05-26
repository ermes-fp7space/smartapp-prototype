//This controller contains the code of the USER REST services.
//It recieves the petition and the params and makes the operations.
//It is using the "User" model, so the operations will be stored in the "users" collection.
//Mongoose makes this automatically in a smart Way.

var mongoose = require("mongoose");
var User = mongoose.model("User");
var Parcel = mongoose.model("Parcel");

//GET -  Return all users in DataBase
exports.findAllUsers = function(req, res){
    User.find(function(err, users){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(users);
    });
};

//GET - Return a User with specified username.
exports.findUserByName = function(req, res) {

    var name = req.params.username;
    User.findOne({'username': name}, { _id: 0, username: 1, email: 1, parcels: 1 }, function (err, user) {

        if (err) return res.send(500, err.message);
        if (user) {
            res.status(200).jsonp(user);
        }
        else {
            res.status(200).jsonp("User " + name + " does not exists.");
        }
    });
};



exports.insertParcelsInUser = function(req, res) {
    var name = req.body.username;

    User.findOne({'username': name}, function (err, user) {

        if (err){
            return res.status(500).send(err.message);
        }
        else if (user) {
            var newParcels = req.body.parcels.split(",");
            var currentParcels = [];
            for(var i = 0; i < user.parcels.length; i++){
                currentParcels.push(user.parcels[i].parcelId);
            }
            for(var i = 0; i < newParcels.length; i++){
                var p = parseInt(newParcels[i]);

                if(!contains(currentParcels, p) && isInt(p)){
                    var newParcel = new Parcel();
                    newParcel.parcelId = p;
                    currentParcels.push(p);
                    user.parcels.push(newParcel);
                }
            }
            user.save(function (err) {
                if (err){
                    return res.status(500).send(err.message);
                }
                else{
                    var response= '{"user": "' + user.username +
                        '", "email": "' + user.email +
                        '", "parcels": "' +  currentParcels + '"}';
                    var responseJson = JSON.parse(response);
                    return res.status(200).jsonp(responseJson);
                }
            });
        }
        else {
            return res.status(200).send("User " + name + " does not exists.");
        }
    });
};

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
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
