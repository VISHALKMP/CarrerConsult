import Rating from '../models/Rating.js';

export const addRating = async (req, res) => {
    try {
        const { userId, professionalId, rating, review } = req.body;

        const newRating = await Rating.create({
            userId,
            professionalId,
            rating,
            review,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'Rating submitted successfully', newRating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};