import { Service } from "./Service.entity";
import { InvoiceDetail } from "./InvoiceDetail.entity";
import { dateToSqlDatetimeFormat } from "../utils/format.utils";
import { Doctor } from "./Doctor.entity";
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Entity } from "typeorm";
import { PatientRecord } from "./PatientRecord.entity";

@Entity()
export class PatientSchedule {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "datetime",
    nullable: false,
    default: dateToSqlDatetimeFormat(new Date()),
  })
  createdAt!: Date;

  @Column({ type: "datetime", nullable: false })
  dateBooking!: Date;

  @Column({ type: "varchar", nullable: false, length: 20 })
  time!: string;

  @Column({ type: "nvarchar", length: 300, nullable: true })
  note!: string | null;

  @Column({ type: "boolean", nullable: false, default: true })
  active!: boolean;

  @Column({ type: "nvarchar", length: "300", nullable: true })
  healthStatus!: string;

  @ManyToOne(
    () => PatientRecord,
    (patientRecord) => patientRecord.patientSchedule
  )
  patientRecord!: PatientRecord;

  @ManyToOne(() => Doctor, (doctor) => doctor.patientSchedules)
  doctor!: Doctor;

  @OneToOne(() => InvoiceDetail)
  invoiceDetails!: InvoiceDetail;

  @ManyToOne(() => Service, (service) => service.patientSchedules)
  service!: Service;
}
