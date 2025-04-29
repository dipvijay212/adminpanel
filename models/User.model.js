const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    role: { type: String, enum: ['Admin', 'Explorer'], default: 'Explorer' },
    location: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
