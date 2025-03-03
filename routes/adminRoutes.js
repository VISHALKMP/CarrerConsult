import express from "express";
import { verifyProfessional ,getAllProfessionals,adminlog,adminregster} from "../controllers/adminController.js";
import {logcheck} from "../middleware/admin.js"
// import ("../models/Professional.js");

const router = express.Router();

router.post("/sign", adminregster);
router.get("/login",logcheck,adminlog);
router.put("/verify-professional/:id", verifyProfessional); 
router.get("/all-professionals", getAllProfessionals);

export default router;