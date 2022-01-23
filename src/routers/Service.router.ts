import { Router } from "express";
import { _add , _getByHospitalId} from "../controllers/Service.controller";

const router = Router();

router.route("/").post(_add);
router.route("/getByHospital").get(_getByHospitalId);

export default router;
