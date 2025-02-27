import Consultation from '../models/Consultation.js';

export const requestConsultation = async (req, res) => {
    try {
        const { userId, professionalId, status } = req.body;

        const consultation = await Consultation.create({
            userId,
            professionalId,
            status: status || 'pending',
            requestedAt: new Date(),
        });

        res.status(201).json({ message: 'Consultation requested successfully', consultation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.findAll();
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};