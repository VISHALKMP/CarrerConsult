import express from "express";
import { verifyProfessional ,getAllProfessionals,forgotPasswordAdmin,verifyOtpAdmin,resetPasswordAdmin,adminlog,NotificationClear,adminregster,verifiedProfessionals,deletingprofessional,AllProfessionals,updateNews} from "../controllers/adminController.js";
import {logcheck} from "../middleware/admin.js"
// import ("../models/Professional.js");

const router = express.Router();

router.post("/sign", adminregster);
router.post("/login",logcheck,adminlog);
router.put("/verify-professional/:id", verifyProfessional); 
router.get("/all-professionals", getAllProfessionals);
router.get("/verfied-professionals", verifiedProfessionals);
router.delete("/delete-professional/:id" , deletingprofessional);
router.get("/AllProfessional",AllProfessionals)
router.get("/profile-update",updateNews);
router.put('/clear-notification/:id',NotificationClear)
router.post('/forgot-password-admin', forgotPasswordAdmin);
router.post('/verify-otp-admin', verifyOtpAdmin);
router.post('/reset-password-admin', resetPasswordAdmin);

export default router;