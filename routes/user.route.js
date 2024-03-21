import { Router } from "express";
import {
    authUser,
    registerUser,
    logOut,
    getUserProfile,
    updateUserProfile,
    getUsers
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logOut);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;