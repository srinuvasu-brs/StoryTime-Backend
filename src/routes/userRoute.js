import express from "express";
import {
  createUser,
  verifyEmail,
  loginUser,
  generateSpotifyRefreshToken,
  getUserProfile,
  updateUserProfile,
  updatePreferredLanguage,
  updatePassword,
  forgotPassword,
  resetPassword,
  saveSpotifyStory,
  removeSpotifyStory,
  getSpotifyStories,
  getDevice,
  resendVerificationCode,
  verifyCode,
  sendPasswordVerificationCode,
  resetPasswordFromMobile,
} from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/verifyEmail/:verifyToken", verifyEmail);
router.post("/login", loginUser);
router.get("/refreshtoken", checkToken, generateSpotifyRefreshToken);
router.get("/profile", checkToken, getUserProfile);
router.put("/profile", checkToken, updateUserProfile);
router.put("/preferredlanguage", checkToken, updatePreferredLanguage);
router.put("/updatepassword", checkToken, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.post("/savestory", checkToken, saveSpotifyStory);
router.delete("/removestory", checkToken, removeSpotifyStory);
router.get("/library", checkToken, getSpotifyStories);



// mobile
router.get("/useragent", getDevice);
router.post("/resendcode", resendVerificationCode);
router.post("/verifycode", verifyCode);
router.post("/forgotpasswordmobile", sendPasswordVerificationCode);
router.post("/resetpasswordmobile", resetPasswordFromMobile);

export default router;
