


import Professional from '../models/Professional.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

import Admin from '../models/Admin.js';

export const registerProfessional = async (req, res) => {
  try {
    const { name, email, password, contact, qualification, experience, specialization, consultationPrice, profilePic, aadharCard, panCard, tenthResult, twelfthResult, collegeMarksheet } = req.body;


      
    if (!name || !email || !password || !contact || !qualification || !experience || !specialization || !consultationPrice) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    //if err 
    // on Cloudinary URLs
    if (!profilePic || !aadharCard || !panCard || !tenthResult || !twelfthResult || !collegeMarksheet) {
      return res.status(400).json({ message: 'Please upload all required files.' });
    }


    
    let existingUser = await User.findOne({ where: { email } });
    existingUser = await Admin.findOne({ where: { email } });
    existingUser = await Professional.findOne({ where: { email } });
    
 

   if (existingUser) {
     return res.status(400).json({ message: 'Professional already registered with this email.' });
   }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfessional = await Professional.create({
      name,
      email,
      password: hashedPassword,
      contact,
      qualification,
      experience,
      specialization,
      consultationPrice,
      profilePic,
      aadharCard,
      panCard,
      tenthResult,
      twelfthResult,
      collegeMarksheet,
      isVerified: false
    });

    res.status(201).json({ message: 'Professional registered', professional: newProfessional });
  } catch (error) {
    console.error('Error occurred during professional registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const loginProff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find professional by email
        const professional = await Professional.findOne({ where: { email } });

        // If professional not found
        if (!professional) {
            return res.status(404).json({ message: 'No record found for this user' });
        }

        // Check if account is verified
        if (!professional.isVerified) {
            return res.status(403).json({ message: 'Your account is not verified yet. Please wait for admin approval.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, professional.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        // All good, send success response
        res.status(200).json({
            message: 'Login successful',
            id: professional.id,
            email: professional.email,
            name: professional.name
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProf = async (req, res) => {
  try {
    const professionalId = req.params.id;
    const { name, specialization, consultationPrice, experience } = req.body;

    // Find the professional record
    const professional = await Professional.findByPk(professionalId);
    if (!professional) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    // Determine what has changed
    let changes = [];
    if (name && professional.name !== name) {
      changes.push(`Name: "${professional.name}" → "${name}"`);
    }
    if (specialization && professional.specialization !== specialization) {
      changes.push(`Specialization: "${professional.specialization}" → "${specialization}"`);
    }
    if (consultationPrice && professional.consultationPrice !== consultationPrice) {
      changes.push(`Consultation Price: "${professional.consultationPrice}" → "${consultationPrice}"`);
    }
    if (experience && professional.experience !== experience) {
      changes.push(`Experience: "${professional.experience}" → "${experience}"`);
    }

    // Update only the allowed fields
    professional.name = name || professional.name;
    professional.specialization = specialization || professional.specialization;
    professional.consultationPrice = consultationPrice || professional.consultationPrice;
    professional.experience = experience || professional.experience;

    // Save a notification message if changes were made
    if (changes.length > 0) {
      professional.profileUpdateMessage = changes.join(', ');
    } else {
      professional.profileUpdateMessage = null; // Clear message if no changes
    }

    await professional.save();

    res.json({ success: true, result: professional });
  } catch (error) {
    console.error('Error updating professional profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile.' });
  }
};
export const forgotPasswordProfessional = async (req, res) => {
  try {
    const { email } = req.body;
    const professional = await Professional.findOne({ where: { email } });
    if (!professional) {
      return res.status(404).json({ message: 'This email is not registered with any professional account.' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    professional.resetOtp = otp;
    professional.resetOtpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    await professional.save();

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7777vishalprajapat@gmai.com',
        pass: 'gqjy oasf dixn odnc'
      },
    });

    const mailOptions = {
      from: '7777vishalprajapat@gmail.com',
      to: email,
      subject: 'Professional Account Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for your Professional Account. Please use the OTP below to reset your password. This OTP is valid for 15 minutes.</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; text-align: center; margin: 20px 0;">${otp}</p>
          <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
          <br />
          <p>Best regards,</p>
          <p>CareerConsult limited</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP has been sent to your email.' });
  } catch (error) {
    console.error('Error in forgotPasswordProfessional:', error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

// Verify OTP for Professional
export const verifyOtpProfessional = async (req, res) => {
  const { email, otp } = req.body;
  const professional = await Professional.findOne({ where: { email } });
  if (!professional) {
    return res.status(404).json({ message: 'Email not registered.' });
  }
  if (professional.resetOtp !== otp || Date.now() > professional.resetOtpExpiry) {
    return res.status(400).json({ message: 'Invalid or expired OTP.' });
  }
  res.json({ message: 'OTP verified successfully.' });
};

// Reset Password for Professional
export const resetPasswordProfessional = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const professional = await Professional.findOne({ where: { email } });
    if (!professional) {
      return res.status(404).json({ message: 'Email not registered.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    professional.password = hashedPassword;
    // Clear OTP fields
    professional.resetOtp = null;
    professional.resetOtpExpiry = null;
    await professional.save();
    res.json({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};