import { Router } from "express";
import {
  _add,
  _getByHospitalId,
  _getAll,
} from "../controllers/Service.controller";

const router = Router();

router.route("/").post(_add);
router.route("/").get(_getAll);
router.route("/getByHospital").get(_getByHospitalId);

export default router;
