
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const APIResponse = require('../utils/ApiResponse'); // Import the APIResponse class



const register = async (req, res) => {
    const { mob, password, name } = req.body;
    console.log('Register Request Body:', req.body);
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobileNumber: mob });
        console.log('Existing User:', existingUser);

        if (existingUser) {
            return APIResponse.validationErrorResponse(res, 'User is already registered');
        }

        // Create new user if not exists
        const user = await User.create({ mobileNumber: mob, password, name });
        console.log('New User Created:', user)

        APIResponse.createdResponse(res, 'User created successfully', user);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};
const login = async (req, res) => {
    const { mob, password } = req.body;
    console.log('Login Request Body:', req.body);
    try {
        const user = await User.findOne({ mobileNumber: mob });
        console.log('User Found:', user);

        if (!user || !(await user.matchPassword(password))) {
            return APIResponse.validationErrorResponse(res, 'Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '48h'
        });
        console.log('Generated Token:', token);

        const data = {
            user: user,
            token: token,
            ipAddress: req.ip,
        };
        APIResponse.successResponse(res, 'User login successfully', data);
    } catch (error) {
        console.error("Login Error:", error); // Log the error for debugging
        APIResponse.errorResponse(res, error.message);

    }
};

const logout = (req, res) => {
    // In a stateless JWT setup, logging out is handled on the client-side
    // The client should delete or clear the token from local storage or cookies

    try {
        // Here, you might also implement server-side logic if using token blacklisting
        // but it's not common for basic JWT setups

        // Simply return a success response
        APIResponse.successResponse(res, 'User logged out successfully');
    } catch (error) {
        console.error("Logout Error:", error); // Log the error for debugging
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { register, login, logout };





