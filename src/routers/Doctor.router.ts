import { Router } from "express";
import {
  _getOne,
  _getAll,
  _getAllByHospitalAndSpecialist,
  _add,
  _update,
  _delete,
} from "../controllers/Doctor.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/getAllByHospitalAndSpecialist").get(_getAllByHospitalAndSpecialist);
router.route("/:id").get(_getOne);
router.route("/").post(_add);
router.route("/").patch(_update);
router.route("/").delete(_delete);

export default router;
