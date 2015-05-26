//This model represents the Schema of the Parcel. (parcels) collection.

var mongoose = require("mongoose");


var Parcel = new mongoose.Schema({
    parcelId: Number,
    soils:[
        {
            kind: String,
            organicMatter: Number,
            ph: Number,
            updateDate: Date
        }
    ]});

module.exports = mongoose.model("Parcel", Parcel);