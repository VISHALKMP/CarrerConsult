import Professional from '../models/Professional.js';

export const registerProfessional = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, contact, qualification, experience, specialization, consultationPrice } = req.body;
        if (!name || !email || !contact || !qualification || !experience || !specialization || !consultationPrice) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingProfessional = await Professional.findOne({ where: { email } });
        if (existingProfessional) {
            return res.status(400).json({ message: 'Professional already exists' });
        }

        const newProfessional = await Professional.create({
            name, email, contact, qualification, experience, specialization, consultationPrice
        });

        res.status(201).json({ message: 'Professional registered', professional: newProfessional });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getVerifiedProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.findAll({
            where: { isVerified: true }
        });

        res.status(200).json(professionals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const verifyProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        const professional = await Professional.findByPk(id);
        if (!professional) {
            return res.status(404).json({ message: 'Professional not found' });
        }

        professional.isVerified = true;
        await professional.save();

        res.status(200).json({ message: 'Professional verified successfully', professional });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.findAll({
            where: { isVerified: true }, //  Only fetch verified professionalsss
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(professionals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getProfessionalById = async (req, res) => {
    try {
        const professional = await Professional.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        if (!professional) {
            return res.status(404).json({ message: 'Professional not found' });
        }

        res.status(200).json(professional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}