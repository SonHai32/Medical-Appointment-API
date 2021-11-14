import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { PatientRecord } from "./PatientRecord.entity";

@Entity()
export class PatientSchedule {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(
    () => PatientRecord,
    (patientRecord) => patientRecord.patientSchedule
  )
  patientRecord!: PatientRecord;
}
