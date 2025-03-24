import { Op } from 'sequelize';
import Admin from "../models/Admin.js";
import Professional from "../models/Professional.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import User from '../models/User.js'

export const verifyProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;


        if (typeof isVerified !== "boolean") {
            return res.status(400).json({ message: "Invalid isVerified value" });
        }


        const professional = await Professional.findByPk(id);
        if (!professional) {
            return res.status(404).json({ message: "Professional not found" });
        }


        professional.isVerified = isVerified;
        await professional.save();

        res.status(200).json({
            message: ` Professional verification updated`,
            professional
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProfessionals = async (req, res, next) => {
    {
        try {
            const professionals = await Professional.findAll({
                where: { isVerified: false },
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(professionals); 

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const AllProfessionals = async (req, res, next) => {
    {
        try {
            const professionals = await Professional.findAll({
                
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(professionals); 

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const verifiedProfessionals = async (req, res, next) => {
    {
        try {
            const professionals = await Professional.findAll({
                where: { isVerified: true },
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(professionals); 

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const deletingprofessional = async (req,res,next)=>{
  try{  const { id } = req.params;
    // Assuming Professional is your Sequelize model
    const professional = await Professional.findByPk(id);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }
    await professional.destroy(); // Delete the professional record
    res.status(200).json({ message: "Professional deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// export const adminsignIn= async(req,res,next) =>{
//   try {  const { name, email, password,  } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingadmin = await admin.findOne({ where: { email } });
//     if (existingadmin) {
//         return res.status(400).json({ message: 'User already exists' });
//     }
//     // const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await admin.create({ name, email, password: hashedPassword });

//     // const newUser = await User.create({ name, email, password, role });      ==== ye bina hash salt ke likha huwa upar wala hashkesath
//     res.status(201).json({ message: 'admin registered', admin: newadmin });
//     console.log(admin);

// } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });

// }

// }

export const adminregster = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

       
        let existingUser = await User.findOne({ where: { email } });
         existingUser = await Admin.findOne({ where: { email } });
         existingUser = await Professional.findOne({ where: { email } });
         
      

        if (existingUser) {
          return res.status(400).json({ message: 'Admin already registered with this email.' });
        }
        
        // const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({ name, email, password: hashedPassword });

        // const newUser = await User.create({ name, email, password, role });      ==== ye bina hash salt ke likha huwa upar wala hashkesath
        res.status(201).json({ message: 'Admin registered', Admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export let adminlog = async (req, res) => {
    try {
          

        res.status(200).json({ message: 'Login successful', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





// export const getAllProfessionals = async (req, res) => {
//     try {
//       const professionals = await User.findAll({ where: { role: 'professional' } });
//       res.status(200).json(professionals);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching professionals', error });
//     }
//   };




export const updateNews = async (req, res) => {
  try {
    // Fetch professionals with a non-null and non-empty profileUpdateMessage
    const notifications = await Professional.findAll({
      where: {
        profileUpdateMessage: {
          [Op.and]: {
            [Op.ne]: null,
            [Op.ne]: ''
          }
        }
      },
      attributes: ['id', 'name', 'profileUpdateMessage', 'updatedAt']

      
    }); await Promise.all(
        notifications.map(async (professional) => {
          professional.profileUpdateMessage = null;
          await professional.save();
        })
      );
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching profile update notifications:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const NotificationClear = async (req, res) => {
    try {
      const professionalId = req.params.id;
      const professional = await Professional.findByPk(professionalId);
      if (!professional) {
        return res.status(404).json({ error: 'Professional not found' });
      }
      
      professional.profileUpdateMessage = null;
      await professional.save();
      
      res.json({ success: true, message: 'Notification cleared.' });
    } catch (error) {
      console.error("Error clearing notification:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
export const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Email not registered.' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetOtp = otp;
    admin.resetOtpExpiry = Date.now() + 15 * 60 * 1000;
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7777vishalprajapat@gmail.com',
        pass: 'gqjy oasf dixn odnc'
      },
    });
    
    const mailOptions = {
      from: '7777vishalprajapat@gmail.com',
      to: email,
      subject: 'Your Admin Password Reset OTP',
      text: `Your OTP is: ${otp}. It is valid for 15 minutes.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

export const verifyOtpAdmin = async (req, res) => {
  const { email, otp } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    return res.status(404).json({ message: 'Email not registered.' });
  }
  if (admin.resetOtp !== otp || Date.now() > admin.resetOtpExpiry) {
    return res.status(400).json({ message: 'Invalid or expired OTP.' });
  }
  res.json({ message: 'OTP verified successfully.' });
};

export const resetPasswordAdmin = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Email not registered.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.resetOtp = null;
    admin.resetOtpExpiry = null;
    await admin.save();
    res.json({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};