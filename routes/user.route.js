import { Router } from "express";
import {
    authUser,
    registerUser,
    logOut,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteProfile,
    getNearbyUsers
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authValidator, userValidator } from "../validators/userValidator.js";
import { parseError } from "../middlewares/errorParser.js";
const router = Router();

router.get('/', getUsers);

router.post('/register', userValidator(), parseError, registerUser);

router.post('/login', authValidator(), parseError, authUser);

router.post('/logout', logOut);

router.get('/nearby', protect, getNearbyUsers);

router.route('/profile')
    .get(getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteProfile);

export default router;