import express from 'express';
import { body } from "express-validator";
// import Professional from '../models/professionalModel.js';

import {
    registerProfessional,
    loginProff,
    updateProf,
    forgotPasswordProfessional
   ,verifyOtpProfessional,
   resetPasswordProfessional
    
} from '../controllers/professionalController.js';
import {regProff} from '../middleware/Professionals.js'

import Professional from '../models/Professional.js';
const router = express.Router();

router.put('/update/:id',updateProf)

router.post('/forgot-password-professional', forgotPasswordProfessional);
router.post('/verify-otp-professional', verifyOtpProfessional);
router.post('/reset-password-professional', resetPasswordProfessional);
router.post('/register',regProff, registerProfessional);

router.post('/login',body("email").isEmail().withMessage("Invalid email"),
body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),loginProff)

router.get('/profile/:email', async (req, res) => {
    const { email } = req.params;
    console.log("Email from request params:", email); // Debugging: log the email being received
    
    try {
        // Find the professional using the provided email
        const professional = await Professional.findOne({ where: { email } });
        
        if (!professional) {
            // If no professional is found, return a 404 status
            return res.status(404).json({ message: 'Professional not found' });
        }

        console.log("Professional data fetched:", professional); // Debugging: log the fetched professional
        
        // Respond with the professional's data
        return res.status(200).json({ message: "Professional data fetched successfully", result: professional });
    } catch (err) {
        // Handle errors and provide a clear error response
        console.error('Error fetching professional profile:', err); // Log the error for debugging
        
        return res.status(500).json({
            message: 'An error occurred while fetching the professional profile',
            error: err.message || 'Internal Server Error'
        });
    }
});


export default router;

