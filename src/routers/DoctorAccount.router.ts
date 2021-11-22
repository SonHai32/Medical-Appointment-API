import { Router } from "express";
import {
  _getAll,
  _getOne,
  _login,
  _register,
  _delete,
  _disable,
} from "../controllers/DoctorAccount.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/:id").get(_getOne);
router.route("/login").post(_login);
router.route("/register").post(_register);
router.route("/disable").patch(_disable);
router.route("/").delete(_delete);

export default router;
