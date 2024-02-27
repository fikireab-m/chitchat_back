import { Router } from "express";
import {
    authUser,
    registerUser,
    logOut,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logOut);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;