const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userLogger = require('../middlewares/userLogger');
require('dotenv').config();

// POST - Register
const registerUser = async (req, res) => {
    const { username, email, dob, role, location, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            dob,
            role,
            location,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token and username in the response
        res.status(200).send({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};



// GET - All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude passwords
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// GET - Particular User
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id, { password: 0 });
        if (!user) return res.status(404).send('User not found.');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// PATCH/PUT - Update User (Admin only)
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(id, req.body);
        res.status(200).send('User updated successfully.');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// DELETE - Delete User (Admin only)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully.');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
