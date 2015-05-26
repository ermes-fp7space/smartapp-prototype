//This controller contains the code of the PARCEL REST services.
//It recieves the petition and the params and makes the operations.
//It is using the "Parcel" model, so the operations will be stored in the "parcels" collection.
//Mongoose makes this automatically in a smart Way.

var mongoose = require("mongoose");
var Parcel = mongoose.model("Parcel");

//GET -  Return all parcels in DataBase
exports.findAllParcels = function(req, res){
    Parcel.find(function(err, parcels){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(parcels);
    });
};

 //GET - Return a Parcel with specified parcelId.
 exports.findParcelById = function(req, res) {
     var id = req.params.parcelId;
     Parcel.findOne({'parcelId': id}, function(err, parcel){

        if (err) return res.send(500, err.message);
        if (parcel) {
            res.status(200).jsonp(parcel);
        }
         else {
            res.status(200).jsonp("Parcel " + id + " does not exists.");
        }
    });
 }

//POST - Insert a new Parcel in the DB
exports.addParcel = function(req, res){

    if(!req.body.parcelId)
        res.status(200).jsonp("parcelId field not find.");
    else {
        var parcel = new Parcel({
            parcelId: req.body.parcelId,
            ownerId: req.body.ownerId,
            water: req.body.water,
            phenology: req.body.phenology,
            image: req.body.image
        });

        parcel.save(function (err, parcel) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(parcel);
        });
    }
};

//PUT - Update an existing parcel.
exports.updateParcel = function(req, res){
    var id = req.params.parcelId;
    Parcel.findOne({'parcelId': id}, function(err, parcel){
        if (err) return res.send(500, err.message);
        if(parcel==null){
            res.status(200).send("Parcel " + id + " does not exists.");
        }
        else{
            parcel.parcelId = id;
            parcel.ownerId = req.body.ownerId;
            parcel.water = req.body.water;
            parcel.phenology = req.body.phenology;
            parcel.image = req.body.image;

            parcel.save(function(err, parcel) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(parcel);
            });
        }
    });
};

//DELETE - Delete a Parcel using the parcelId
exports.deleteParcel = function(req, res){
    var id = req.params.parcelId;

    Parcel.findOne({'parcelId': id}, function(err, parcel){
        if(parcel==null){
            res.status(200).send("Parcel " + id + " does not exists.");
        }
        else {
            parcel.remove(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).send("Parcel " + id + " deleted.");
            });
        }
    });
};