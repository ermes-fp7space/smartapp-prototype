var mongoose = require("mongoose");

var Phenology = new mongoose.Schema({
    observationDate: Date,
    developmentStage: String,
    growthStage: String,
    code: String
});

module.exports = mongoose.model("Phenology", Phenology);

//Example Crop
//{
//    observationDate: "08/07/2015",
//    developmentStage: "3rd leaf",
//    growthStage: "2: Tillering",
//    code: "22: 2 tillers derectable"
//}
