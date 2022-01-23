import { Router } from "express";
import {
  _add,
  _getOne,
  _getAll,
  _update,
  _deleteOne,
} from "../controllers/PatientRecord.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/:id").get(_getOne);
router.route("/").post(_add);
router.route("/").patch(_update);
router.route("/").delete(_deleteOne);

export default router;
