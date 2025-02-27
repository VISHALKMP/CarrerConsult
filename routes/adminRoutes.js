import express from "express";
import { verifyProfessional } from "../controllers/adminController.js";

const router = express.Router();

router.put("/verify-professional/:id", verifyProfessional); 

export default router;