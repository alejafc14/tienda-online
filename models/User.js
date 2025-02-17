const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String }, // Elimina `required: true` si no es obligatorio
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
