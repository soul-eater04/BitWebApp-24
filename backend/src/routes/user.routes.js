import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser1,
  updatePlacementOne,
  updatePlacementTwo,
  updatePlacementThree,
  getPlacementDetails,
  getCurrentUser,
  getUserbyRoll,
  getPlacementOne,
  getPlacementTwo,
  getPlacementThree,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "idCard", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update").patch(verifyJWT, upload.fields([{name: "image", maxCount:1}]), updateUser1);
router.route("/get-user").get(verifyJWT, getCurrentUser);
router
  .route("/pone")
  .patch(
    verifyJWT,
    upload.fields([{ name: "doc", maxCount: 1 }]),
    updatePlacementOne
  );
router.route("/getbyroll").post(getUserbyRoll);
router
  .route("/ptwo")
  .patch(
    verifyJWT,
    upload.fields([{ name: "doc", maxCount: 1 }]),
    updatePlacementTwo
  );
router
  .route("/pthree")
  .patch(
    verifyJWT,
    upload.fields([{ name: "doc", maxCount: 1 }]),
    updatePlacementThree
  );

router.route("/placementDetails").get(verifyAdmin, getPlacementDetails);
router.route("/placementOne").get(verifyJWT, getPlacementOne);
router.route("/placementTwo").get(verifyJWT, getPlacementTwo);
router.route("/placementThree").get(verifyJWT, getPlacementThree);

export default router;
