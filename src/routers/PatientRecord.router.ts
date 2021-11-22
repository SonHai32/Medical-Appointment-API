import { Router } from "express";
import {
  _add,
  _getOne,
  _update,
} from "../controllers/PatientRecord.controller";

const router = Router();
router.route("/:id").get(_getOne);
router.route("/").post(_add);
router.route("/").patch(_update);

export default router;
