import express from 'express';
import { registerUser,userlogin,getAllProfessionals} from '../controllers/userController.js';
import {registerCheck,loginCheck} from '../middleware/user.js'
const router = express.Router();

// router.get('/all', getAllUsers);
// router.get('/:id', getUserById);
router.post('/register',registerCheck,registerUser);
router.post('/login',loginCheck,userlogin);
router.get("/allProff", getAllProfessionals);
// router.get('/', getAllUsers);
export default router;