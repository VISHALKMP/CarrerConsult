 import Professional from "../models/Professional.js";

export const verifyProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;


        if (typeof isVerified !== "boolean") {
            return res.status(400).json({ message: "Invalid isVerified value" });
        }


        const professional = await Professional.findByPk(id);
        if (!professional) {
            return res.status(404).json({ message: "Professional not found" });
        }


        professional.isVerified = isVerified;
        await professional.save();

        res.status(200).json({
            message:` Professional verification updated`,
            professional
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};