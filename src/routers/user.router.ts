import {
  _deleteUsers,
  _getAllUser,
  _getUserDetail,
  _insertUser,
  _updateUserDetail,
  _updateUserPassword,
} from "../controllers/User.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(_getAllUser); //Middleware Authorizaton, Admin role
router.route("/:id").get(_getUserDetail); //Middleware Authorizaton, Admin role
router.route("/").post(_insertUser); //Middleware Auththorization
router.route("/detail").patch(_updateUserDetail); //Middleware Auththorization
router.route("/password").patch(_updateUserPassword); //Middleware Auththorization
router.route("/").delete(_deleteUsers);
export default router; //Middleware Authorizaton, Admin role
