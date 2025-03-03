import express from 'express';
import { requestConsultation,getAllConsultations } from '../controllers/consultationController.js';

const router = express.Router();

router.post('/request', requestConsultation);
router.get('/:id', getAllConsultations);
console.log(getAllConsultations);

export default router;