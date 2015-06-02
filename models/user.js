//This model represents the Schema of the User. (users) collection.

var mongoose = require("mongoose");
var Parcel = mongoose.model("Parcel");
var ParcelSchema = Parcel.schema;

var User = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    parcels: [ParcelSchema]
    });

module.exports = mongoose.model('User', User);

//module.exports = mongoose.model("User",{
//    username: String,
//    password: String,
//    email: String,
//    parcels: [
//        {
//            parcelId: Number,
//            soils:[
//                {
//                    kind: String,
//                    organicMatter: Number,
//                    ph: Number,
//                    updateDate: Date
//                }
//            ]
//        }
//        ]
//    }
//);