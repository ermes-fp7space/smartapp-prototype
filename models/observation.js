var mongoose = require("mongoose");

var Observation = new mongoose.Schema({
    date: Date,
    comments: String,
    file: Buffer
});

module.exports = mongoose.model("Observation", Observation);

//Example Disease
//{
//    observationDate: "25/06/16",
//    name: "Pyricularia (Blast)",
//    comment: "Comment Disease",
//    file: "",
//    damage: "5"
//}
