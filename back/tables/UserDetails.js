const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    nomPrenom: String,
    email: { type: String, unique: true },
    username: String,
    password: String
}, {
    collection: "User"
});
mongoose.model("User", UserDetailsSchema);