import { Router } from "express";
import { _getAll, _getOne } from "../controllers/SpecialistPrice.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/:id").get(_getOne);

export default router;
