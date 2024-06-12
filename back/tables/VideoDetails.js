const mongoose = require("mongoose");

const VideoDetailsSchema = new mongoose.Schema({
    name: String, // Name of the video
    type: {
        type: String,
        enum: ['video'], // Only allow 'video' type
        required: true
    },
    data: Buffer, // Buffer to store video data
    contentType: {
        type: String,
        required: true,
        validate: /^video\/.+/ // Ensure contentType starts with 'video/'
    }
}, {
    collection: "Video"
});

const Video = mongoose.model('Video', VideoDetailsSchema);