import { Router } from "express";
import {
  _getALl,
  _getOne,
  _add,
  _update,
  _delete,
} from "../controllers/Specialist.controller";

const router = Router();
router.route("/").get(_getALl);
router.route("/:id").get(_getOne);
router.route("/").post(_add);
router.route("/").patch(_update);
router.route("/").delete(_delete);

export default router;
