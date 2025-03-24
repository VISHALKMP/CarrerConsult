import express from 'express';
import { registerUser,userlogin,getAllProfessionals,getUserById,updateConsultation,forgotPassword, verifyOtp, resetPassword } from '../controllers/userController.js';
import {registerCheck,loginCheck} from '../middleware/user.js'
const router = express.Router();

// router.get('/all', getAllUsers);
router.post('/register',registerCheck,registerUser);
router.post('/login',loginCheck,userlogin);
router.get("/allProff", getAllProfessionals);
router.put('/update/:id', updateConsultation);

router.get('/:id/', getUserById);

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
// router.get('/:id', getUserById);
// router.get('/', getAllUsers);
export default router;