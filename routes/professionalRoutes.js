import express from 'express';
import { body } from 'express-validator';
import {
    registerProfessional,
    loginProff,
   
    // getVerifiedProfessionals,
    // verifyProfessional,
    // getAllProfessionals,
    // getProfessionalById
} from '../controllers/professionalController.js';
import {regProff} from '../middleware/Professionals.js'
const router = express.Router();

router.post('/register',regProff, registerProfessional);
// router.get('/verified', getVerifiedProfessionals);
// router.put('/verify/:id', verifyProfessional);
// router.get('/all', getAllProfessionals);
// router.get('/:id', getProfessionalById);
router.post('/login',
    body("email","email is must needed").notEmpty(),
    body("email","invalid email").isEmail,
    body("password","Password must contain 6 characters").isLength({min:6}),
    loginProff)

export default router;

//  OLD CODE WITH FEW MISTAKES
// router.post('/register', registerProfessional);
// router.get('/verified', getVerifiedProfessionals);
// router.put('/verify/:id', verifyProfessional);
// router.get('/', getVerifiedProfessionals);


// router.get('/all', getAllProfessionals);
// router.get('/:id', getProfessionalById);

// router.post('/register', registerProfessional);
// mistakley repqet this upper line idk but if i remove this automaically boom baam



// import express from 'express';
// import {   registerProfessional,  getVerifiedProfessionals,    verifyProfessional,  getAllProfessionals,  getProfessionalById
// } from '../controllers/professionalController.js';

// const router = express.Router();

// router.post('/register', registerProfessional);  // Register a professional


// router.get('/verified', getVerifiedProfessionals);  // Get only verified professionals
// router.get('/all', getAllProfessionals);  // Get all professionals (verified + unverified)

// router.get('/:id', getProfessionalById);  // Get a professional by ID
// router.put('/verify/:id', verifyProfessional);  // Admin verifies a professional ture/false

// export default router;
