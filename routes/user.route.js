import { Router } from "express";
import {
    authUser,
    registerUser,
    logOut,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteProfile
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logOut);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteProfile);

export default router;