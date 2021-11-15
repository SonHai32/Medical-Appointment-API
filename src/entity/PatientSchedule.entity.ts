import { dateToSqlDatetimeFormat } from "../utils/format.utils";
import { Doctor } from "./Doctor.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({ type: "int", nullable: false })
  time!: number;

  @Column({ type: "nvarchar", length: 300, nullable: true })
  note!: string | null;

  @Column({ type: "boolean", nullable: false, default: true })
  active!: boolean;

  @ManyToOne(
    () => PatientRecord,
    (patientRecord) => patientRecord.patientSchedule
  )
  patientRecord!: PatientRecord;

  @ManyToOne(() => Doctor, (doctor) => doctor.patientSchedules)
  doctor!: Doctor;
}
