import { Router } from "express";
import {
    authUser,
    registerUser,
    logOut,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js";
const router = Router();

router.post('/', authUser);
router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logOut);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;