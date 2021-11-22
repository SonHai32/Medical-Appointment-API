import { Router } from "express";
import { _getAll, _getOne, _add } from "../controllers/Invoice.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/:id").get(_getOne);
router.route("/").post(_add);

export default router;
