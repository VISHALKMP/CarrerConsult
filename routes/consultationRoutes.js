import express from 'express';
import { requestConsultation,getAllConsultations } from '../controllers/consultationController.js';

const router = express.Router();

router.post('/request', requestConsultation);
router.get('/', getAllConsultations);
export default router;