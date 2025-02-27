import express from 'express';
import { getAllUsers, getUserById ,registerUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', registerUser);
// router.get('/', getAllUsers);
export default router;