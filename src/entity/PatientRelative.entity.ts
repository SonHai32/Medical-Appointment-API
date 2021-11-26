import { PatientRecord } from "../entity/PatientRecord.entity";
import { Column, JoinColumn, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { PrimaryColumn } from "typeorm";
import { Entity } from "typeorm";
@Entity()
export class PatientRelative {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 50, nullable: false })
  fullname!: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  phoneNumber!: string;

  @Column({ type: "nvarchar" })
  address!: string;

  @Column({ type: "nvarchar", length: "30", nullable: false })
  relationship!: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  emailAddress!: string;

  @Column({ type: "nvarchar", length: 300, nullable: true })
  note!: string;

  @OneToOne(
    () => PatientRecord,
    (patientRecord) => patientRecord.patientRelative
  )
  patientRecord!: PatientRecord;
}
