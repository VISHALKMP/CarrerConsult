import Admin from "../models/Admin.js";
import Professional from "../models/Professional.js";
import bcrypt from "bcryptjs";

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
                where: { isVerified: true },
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(professionals); x

        }
        catch (err) {

        }
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

        const existingadmin = await Admin.findOne({ where: { email } });
        if (existingadmin) {
            return res.status(400).json({ message: 'Admin already exists' });
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

