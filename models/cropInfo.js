var mongoose = require("mongoose");

var CropInfo = new mongoose.Schema({
    cropType: String,
    uploadingDate: Date,
    riceVariety: String,
    pudding: String,
    sowingPractice: String,
    date: Date
});

module.exports = mongoose.model("CropInfo", CropInfo);

//Example Crop
//{
//    cropType: "Rice",
//    riceVariety: "Augusto",
//    pudding: true,
//    showingParctice: "Direct Seeding",
//    showingDate: 05/06/2015,
//    updateDate: 06/06/2015
//}
