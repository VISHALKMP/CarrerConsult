import Professional from '../models/Professional.js';
import bcrypt from 'bcryptjs'
// import { regProff } from '../middleware/Professionals.js';

// export const registerProfessional = async (req, res) => {
    // try {
    //     const { name, email,password, contact, qualification, experience, specialization, consultationPrice} = req.body;
    //     const hashedPassword = await bcrypt.hash(password, 10);
        
    //     const newProfessional = await Professional.create({
    //         name, email,password, contact, qualification, experience, specialization, consultationPrice,isVerified: false 
    //     });
    //     const Professional = await Professional.create({ name, email, password: hashedPassword ,contact, qualification, experience, specialization, consultationPrice, isVerified});
        
    //     res.status(201).json({ message: 'Professional registered', professional: newProfessional });
    // } catch (error) {
    //     console.error('Error occurred during professional registration:', error);
    //     res.status(500).json({ message: 'Server error', error: error.message });
    // }
    export const registerProfessional = async (req, res) => {
        try {
            const { name, email, password, contact, qualification, experience, specialization, consultationPrice } = req.body;
            console.log("Karan BOdy :",req.body);
            
            // const  name="karan", email="karan@gmail.com", password="123456", contact="986543242", qualification="bsc", experience=10, specialization="ssc", consultationPrice=900 ;
    
            // Hash the password before creating the Professional
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
                isVerified: false // This ensures the default value is set to false
            });
    
            res.status(201).json({ message: 'Professional registered', professional: newProfessional });
        } catch (error) {
            console.error('Error occurred during professional registration:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
};




export const loginProff = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email ) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const proff = await Professional.findOne({ where: { email } });
        if (!proff) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

      
      

        res.status(200).json({ message: 'Login successful', proff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

