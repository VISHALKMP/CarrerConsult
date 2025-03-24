import User from '../models/User.js';
import Professional from '../models/Professional.js';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js'

export const registerUser = async (req, res) => {
    try {
        const {name,email,password,contact} = req.body;


        let existingUser = await User.findOne({ where: { email } });
         existingUser = await Admin.findOne({ where: { email } });
         existingUser = await Professional.findOne({ where: { email } });
         
      

        if (existingUser) {
          return res.status(400).json({ message: 'User already registered with this email.' });
        }

        
        // const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);
   
        const newUser = await User.create({ name, email,contact, password: hashedPassword });

        // const newUser = await User.create({ name, email, password, role });      ==== ye bina hash salt ke likha huwa upar wala hashkesath
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body; 
     
        const user = await User.findOne({ where: { email } });

        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If all good, send success response
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name 
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
        return res.redirect("/users/login");
    }
};

export const getAllProfessionals = async (req, res) => {
    // res.send("<h1>working</h1>")
    // console.log("wrking 1");

    try {
        console.log("working ");
        
        const professionals = await Professional.findAll({
            where: { isVerified: true }, //  Only fetch verified professionalsss
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(professionals);
    } catch (error) {
        console.log("noy working");
        
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // yaha par bhi miss  password from response
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const updateConsultation = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const consultation = await Consultation.findByPk(id);
      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }
      consultation.status = status;
      await consultation.save();
      res.status(200).json({ message: 'Consultation updated', consultation });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // controllers/userController.js
// import User from '../models/user.js'; // Your user model
import nodemailer from 'nodemailer';



export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not registered.' });
    }
    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
    // Optionally clear the OTP here or wait until password reset
    res.json({ message: 'OTP verified successfully.' });
  };
//   import bcrypt from 'bcrypt';

  export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not registered.' });
    }
    // Hash new password and update user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // Clear OTP fields
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();
    res.json({ message: 'Password reset successfully.' });
  };
    


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Received forgot password request for:", email);
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("No user found for:", email);
      return res.status(404).json({ message: 'This email is not registered.' });
    }
    
    // Generate a 6-digit OTP and set expiry (15 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();
    console.log("OTP generated and saved:", otp);

    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7777vishalprajapat@gmail.com',
        pass: 'gqjy oasf dixn odnc',
      },
    });

    // Build HTML email content with inline styling
    const mailOptions = {
      from: '7777vishalprajapat@gmail.com',
      to: email,
      subject: 'Your Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for your account. Please use the OTP below to proceed. This OTP is valid for 15 minutes.</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; text-align: center; margin: 20px 0;">${otp}</p>
          <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
          <br />
          <p>Best regards,</p>
          <p>CarrerConsult</p>
        </div>
      `
    };

    // Attempt sending the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully");
    } catch (mailError) {
      console.error("Error sending mail:", mailError);
      return res.status(500).json({ message: 'Error sending OTP email.' });
    }
    
    res.json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

