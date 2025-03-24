import express from 'express';
import { requestConsultation,getProfessionalConsultations,getUserConsultations,updateConsultationStatus,scheduleConsultation,cancelRequest,DeletingtheConsult,acceptConsultation} from '../controllers/consultationController.js';
import Consultation from '../models/Consultation.js';

const router = express.Router();

router.post('/request', requestConsultation);
router.get('/:id/', getProfessionalConsultations);
router.get('/user/:id', getUserConsultations);

// Update consultation status (Accept/Reject)
router.put('/update/:id',updateConsultationStatus);
router.put('/schedule/:consultationId',scheduleConsultation)
router.put('/cancel/:id',cancelRequest);
router.delete('/delete/:id',DeletingtheConsult);
router.put('/accept/:consultationId', acceptConsultation)
console.log(getProfessionalConsultations);

export default router;