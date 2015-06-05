var mongoose = require("mongoose");

var Weed = new mongoose.Schema({
    observationDate: Date,
    name: String,
    comment: String,
    file: Buffer,
    damage: Number
});

module.exports = mongoose.model("Weed", Weed);

//Example Disease
//{
//    observationDate: "25/06/16",
//    name: "Pyricularia (Blast)",
//    comment: "Comment Disease",
//    file: "",
//    damage: "5"
//}
