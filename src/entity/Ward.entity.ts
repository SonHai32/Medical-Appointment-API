import { Doctor } from './Doctor.entity';
import { PatientRecord } from "./PatientRecord.entity";
import { Hospital } from "./Hospital.entity";
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { District } from "./District.entity";

@Entity()
export class Ward {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  name!: string;

  @ManyToOne(() => District, (district) => district.ward)
  district!: District;

  @OneToMany(() => Hospital, (hospital) => hospital.ward)
  hospital!: Hospital[];

  @OneToMany(() => PatientRecord, (patientRecord) => patientRecord.ward)
  patientRecord!: PatientRecord[];

  @OneToMany(() => Doctor, doctor => doctor.ward)
  doctors!: Doctor[]
}
