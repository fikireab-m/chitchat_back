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
import { authValidator, protect } from "../middlewares/authMiddleware.js";
import { userValidator } from "../middlewares/userValidator.js";
import { parseError } from "../middlewares/errorParser.js";
const router = Router();

router.get('/', getUsers);
router.post('/register', userValidator(), parseError, registerUser);
router.post('/login', authValidator(), parseError, authUser);
router.post('/logout', logOut);
router.route('/nearby').get(protect, getNearbyUsers);
router.route('/profile')
    .get(getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteProfile);

export default router;