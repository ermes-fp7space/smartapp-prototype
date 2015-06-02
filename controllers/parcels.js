var mongoose = require("mongoose");
var User = mongoose.model("User");
var Parcel = mongoose.model("Parcel");
var Soil = mongoose.model("Soil");
var ParcelStatus = mongoose.model("ParcelStatus");
var Crop = mongoose.model("Crop");
var Yield = mongoose.model("Yield");
var IrrigationInfo = mongoose.model("IrrigationInfo");
var bCrypt = require('bcrypt-nodejs');

exports.insertSoil = function(req, res){
    var name = req.body.username;
    var parcels = stringToIntArray(req.body.parcels);
    var password = req.body.password;
    var soil = JSON.parse(req.body.soil);
   //var soil = JSON.parse(req.body.soil.replace(/\'/g, "\""));

    var newSoil = new Soil();
    newSoil.soilTexture = soil.soilTexture;
    newSoil.organicMatter = soil.organicMatter;
    newSoil.ph = soil.ph;
    newSoil.updateDate = soil.updateDate;

    User.findOne({'username': name}, function (err, user) {


        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
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

                    user.parcels[i].soils.push(newSoil);
                }
            }
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

exports.insertParcelStatus = function(req, res){
    var name = req.body.username;
    var parcels = stringToIntArray(req.body.parcels);
    var password = req.body.password;
    var parcelStatus = JSON.parse(req.body.parcelStatus);


    var newParcelStatus = new ParcelStatus();
    newParcelStatus.parcelStatus = parcelStatus.parcelStatus;
    newParcelStatus.updateDate = parcelStatus.updateDate;

    User.findOne({'username': name}, function (err, user) {


        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
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
                    console.log(newParcelStatus);
                    user.parcels[i].parcelStatus.push(newParcelStatus);
                }
            }
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

exports.insertCrop = function(req, res){
    var name = req.body.username;
    var parcels = stringToIntArray(req.body.parcels);
    var password = req.body.password;
    var crop = JSON.parse(req.body.crop);


    var newCrop = new Crop();
    newCrop.cropType = crop.cropType;
    newCrop.riceVariety = crop.riceVariety;
    newCrop.pudding = crop.pudding;
    newCrop.showingParctice = crop.showingParctice;
    newCrop.showingDate = crop.showingDate;
    newCrop.updateDate = crop.updateDate;

    User.findOne({'username': name}, function (err, user) {

        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
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
                    console.log(newCrop);
                    user.parcels[i].crops.push(newCrop);
                }
            }
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

exports.insertYield = function(req, res){
    var name = req.body.username;
    var parcels = stringToIntArray(req.body.parcels);
    var password = req.body.password;
    var yield = JSON.parse(req.body.yield);


    var newYield = new Yield();
    newYield.harvestDate = yield.harvestDate;
    newYield.yield = yield.yield;
    newYield.comments = yield.comments;

    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
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
                    console.log(newYield);
                    user.parcels[i].yields.push(newYield);
                }
            }
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

exports.insertIrrigationInfo = function(req, res){
    var name = req.body.username;
    var parcels = stringToIntArray(req.body.parcels);
    var password = req.body.password;
    var irrigationInfo = JSON.parse(req.body.irrigationInfo);


    var newIrrigationInfo = new IrrigationInfo();
    newIrrigationInfo.startDate = irrigationInfo.startDate;
    newIrrigationInfo.endDate = irrigationInfo.endDate;
    newIrrigationInfo.quantityOfWaterMeasure = irrigationInfo.quantityOfWaterMeasure;
    newIrrigationInfo.quantityOfWaterValue = irrigationInfo.quantityOfWaterValue;
    newIrrigationInfo.quantityOfWaterHours = irrigationInfo.quantityOfWaterHours;
    newIrrigationInfo.waterDepth = irrigationInfo.waterDepth;

    User.findOne({'username': name}, function (err, user) {
        if (err){
            return res.status(500).send(err.message);
        }
        else if(user) {

            if(!isValidPassword(user, password))
                return res.status(200).send("Password Wrong.");
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
                    user.parcels[i].irrigationInfos.push(newIrrigationInfo);
                }
            }
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