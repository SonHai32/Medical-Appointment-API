import { Router } from "express";
import userRouter from "./User.router";
import patientRecordRouter from "./patientRecord.router";

const router = Router();
router.use("/user", userRouter);
router.use("/patient-record", patientRecordRouter);
export default router;
