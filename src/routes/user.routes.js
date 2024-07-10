import {Router} from 'express'
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateUser,
} from '../controllers/user.controller.js'


import {verifyJWT} from '../middlewares/auth.middleware.js'


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/currentUser").get(verifyJWT,getCurrentUser);
router.route('/refresh-token').post(refreshAccessToken);
// router.route('/getCurrentUser').post(verifyJWT,getCurrentUser)
router.route('/updateUser').post(verifyJWT,updateUser);

export default router;