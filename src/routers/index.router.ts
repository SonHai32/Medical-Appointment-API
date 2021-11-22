import { Router } from "express";
import PatientRecordRouter from "./PatientRecord.router";
import AcademicRankRouter from './AcademicRank.router'
import CountryRouter from './Country.router';
import DistrictRouter from './District.router';
import DoctorRouter from './Doctor.router';
import DoctorAccountRouter from './DoctorAccount.router';
import GenderRouter from './Gender.router';
import HospitalRouter from './Hospital.router';
import InvoiceRouter from './Invoice.router';
import InvoiceDetailRouter from './InvoiceDetail.router';
import NationRouter from './Nation.router';
import PatientScheduleRouter from './PatientSchedule.router';
import PaymentMethodRouter from './PaymentMethod.router';
import ProvinceRouter from './Province.router';
import RoleRouter from './Role.router';
import RoomRouter from './Room.router';
import ShiftRouter from './Shift.router';
import SpecialistRouter from './Specialist.router';
import SpecialistPriceRouter from './SpecialistPrice.router';
import UserRouter from './User.router';
import WardRouter from './Ward.router';

const router = Router();
router.use('/academic-rank', AcademicRankRouter)
router.use('/country', CountryRouter)
router.use('/district', DistrictRouter)
router.use('/doctor', DoctorRouter)
router.use('/doctor-account', DoctorAccountRouter)
router.use('/gender', GenderRouter)
router.use('/hospital', HospitalRouter)
router.use('/invoice', InvoiceRouter)
router.use('/invoice-detail', InvoiceDetailRouter)
router.use('/nation', NationRouter)
router.use('/patient-schedule', PatientScheduleRouter)
router.use('/patient-record', PatientRecordRouter)
router.use('/payment-method', PaymentMethodRouter)
router.use('/province', ProvinceRouter)
router.use('/role', RoleRouter)
router.use('/room', RoomRouter)
router.use('/shift', ShiftRouter)
router.use('/specialist-price', SpecialistPriceRouter)
router.use('/specialist', SpecialistRouter)
router.use('/ward', WardRouter)
router.use("/user", UserRouter);
export default router;
