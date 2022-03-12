import { Router } from "express";
import { userAuthorizationMiddleware } from "../middlewares/UserAuth.middleware";
import {
  _login,
  _register,
  _getUserWithToken,
  _refreshToken,
  _logout,
} from "../controllers/UserAuth.controller";

const router = Router();
router.route("/login").post(_login);
router.route("/logout").get(_logout);
router.route("/register").post(_register);
router.route("/getUser").get(userAuthorizationMiddleware, _getUserWithToken);
router.route("/refreshToken").get(_refreshToken);

export default router;
