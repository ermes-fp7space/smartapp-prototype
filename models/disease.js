var mongoose = require("mongoose");

var Disease = new mongoose.Schema({
    observationDate: Date,
    name: String,
    comment: String,
    file: Buffer,
    damage: Number
});

module.exports = mongoose.model("Disease", Disease);

//Example Disease
//{
//    observationDate: "25/06/16",
//    name: "Pyricularia (Blast)",
//    comment: "Comment Disease",
//    file: "",
//    damage: "5"
//}
