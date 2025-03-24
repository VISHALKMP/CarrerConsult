import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
export const logcheck = async(req,res,next)=>{

const { email, password } = req.body;
console.log(req.body);
if (!email || !password) {
    return res.status(400).json({ message: 'All fields required' });
    
}

const admin = await Admin.findOne({ where: { email } });
if (!admin) {
    return res.status(400).json({ message: 'Invalid credentials' });
}
const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
else{
    next();
 }
}
