// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';

// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         if (!name || !email || !password || !role) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({ name, email, password: hashedPassword, role });

//         res.status(201).json({ message: 'User registered', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };