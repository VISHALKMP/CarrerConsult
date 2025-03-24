import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const registerCheck = async (req,res,next) =>{
    try{
        const { name, email, password,contact} = req.body;

        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: 'All fields are required' });
          
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        else{
            next();
        }

    
    }
    catch(err){
        console.log(err);
        
        
    }
}

// login check-ing 

export const loginCheck = async (req,res,next) =>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    else{
        next();
    }
    
}