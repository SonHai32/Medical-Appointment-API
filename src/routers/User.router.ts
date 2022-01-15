import {
  _delete,
  _getAll,
  _getOne,
  _login,
  _register,
  _update,
  _updateUserPassword,
} from "../controllers/User.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(_getAll); //Middleware Authorizaton, Admin role
router.route("/:id").get(_getOne); //Middleware Authorizaton, Admin role
router.route("/").post(_register); //Middleware Auththorization
router.route("/login").post(_login); //Middleware Auththorization
router.route("/update-detail").patch(_update); //Middleware Auththorization
router.route("/update-password").patch(_updateUserPassword); //Middleware Auththorization
router.route("/").delete(_delete);
export default router; //Middleware Authorizaton, Admin role
