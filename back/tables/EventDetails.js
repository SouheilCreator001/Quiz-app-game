
const mongoose = require("mongoose");

const EventDetailsSchema = new mongoose.Schema({
    dateEvent: Date,
    titreEvent: String,
    descTxtEvent: {
        type: String,
        maxlength: 10000
    },
    descSimpleEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    descFullEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FilePDF"
    },
    categorieEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    },
    imageEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
}, {
    collection: "Event"
}); 

EventDetailsSchema.virtual('year').get( function () {
    return this.dateEvent.getFullYear();
} );

mongoose.model("Event", EventDetailsSchema);
