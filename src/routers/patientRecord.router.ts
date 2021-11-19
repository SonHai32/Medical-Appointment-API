import { _add, _getOne, _update } from "../controllers/PatientRecord.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(_add);
router.route("/:id").get(_getOne);
router.route('/').patch(_update)

export default router;
