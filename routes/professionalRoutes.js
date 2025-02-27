import express from 'express';
import {
    registerProfessional,
    getVerifiedProfessionals,
    verifyProfessional,
    getAllProfessionals,
    getProfessionalById
} from '../controllers/professionalController.js';

const router = express.Router();

router.post('/register', registerProfessional);
router.get('/verified', getVerifiedProfessionals);
router.put('/verify/:id', verifyProfessional);
router.get('/all', getAllProfessionals);
router.get('/:id', getProfessionalById);

export default router;

// router.post('/register', registerProfessional);
// router.get('/verified', getVerifiedProfessionals);
// router.put('/verify/:id', verifyProfessional);
// router.get('/', getVerifiedProfessionals);


// router.get('/all', getAllProfessionals);
// router.get('/:id', getProfessionalById);

// router.post('/register', registerProfessional);
// mistakley repqet this upper line idk but if i remove this automaically boom baam😅



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
