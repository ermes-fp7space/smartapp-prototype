var mongoose = require("mongoose");

var Pathogen = new mongoose.Schema({
    observationDate: Date,
    name: String,
    comment: String,
    file: Buffer,
    damage: Number
});

module.exports = mongoose.model("Pathogen", Pathogen);

//Example Crop
//{
//    usageDate: "08/06/2015",
//    product: "Mixed Product",
//    amount: 5
//}
