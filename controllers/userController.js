import User from '../models/User.js';
import Professional from '../models/Professional.js';
import bcrypt from 'bcryptjs';
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ message: "Error retrieving users", error });
//     }
// };
export const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body;
      
        // const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);
   
        const newUser = await User.create({ name, email, password: hashedPassword });

        // const newUser = await User.create({ name, email, password, role });      ==== ye bina hash salt ke likha huwa upar wala hashkesath
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const userlogin = async (req, res) => {
    try {
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        request.session.destroy();
        req,session.destroy((err)=>{
            if(err){
                console.log("failed to destory session",err);
                
            }
            else{
                console.log("session has been destroyed");
                
            }
        })
        return res.redirect("/users/login");
    }
};
export const getAllProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.findAll({
            where: { isVerified: true }, //  Only fetch verified professionalsss
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(professionals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// export const getUserById = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id, {
//             attributes: { exclude: ['password'] } // yaha par bhi miss  password from response
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };