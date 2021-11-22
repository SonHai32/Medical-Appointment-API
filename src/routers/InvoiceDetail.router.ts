import { Router } from "express";
import { _add, _getAll } from "../controllers/InvoiceDetail.controller";

const router = Router();
router.route("/").get(_getAll);
router.route("/").post(_add);

export default router;
