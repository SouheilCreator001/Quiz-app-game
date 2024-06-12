const mongoose = require("mongoose");

const FilePDFDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['pdf'],
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
}, {
    collection: "FilePDF"
}); 

mongoose.model("FilePDF", FilePDFDetailsSchema);