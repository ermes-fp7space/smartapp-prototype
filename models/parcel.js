//This model represents the Schema of the Parcel. (parcels) collection.

var mongoose = require("mongoose");
var Soil = mongoose.model("Soil");
var SoilSchema = Soil.schema;
var ParcelStatus = mongoose.model("ParcelStatus");
var ParcelStatusSchema = ParcelStatus.schema;
var Crop = mongoose.model("Crop");
var CropSchema = Crop.schema;
var Yield = mongoose.model("Yield");
var YieldSchema = Yield.schema;
var IrrigationInfo = mongoose.model("IrrigationInfo");
var IrrigationInfoSchema = IrrigationInfo.schema;

var Parcel = new mongoose.Schema({
    parcelId: Number,
    soils:[SoilSchema],
    parcelStatus:[ParcelStatusSchema],
    crops:[CropSchema],
    yields: [YieldSchema],
    irrigationInfos: [IrrigationInfoSchema]
});

module.exports = mongoose.model("Parcel", Parcel);