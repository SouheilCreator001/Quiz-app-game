const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image'],
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true,
        validate: /^image\/.+/
    }
}, {
    collection: "Image"
}); 

mongoose.model("Image", ImageDetailsSchema);