const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    ImageID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    // resolution: {
    //     type: String,
    //     required: true,
    // },
    extension: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    path: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("image", ImageSchema);
