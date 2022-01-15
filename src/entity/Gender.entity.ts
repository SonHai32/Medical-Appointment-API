import { PatientRecord } from './PatientRecord.entity';
import { User } from './User.entity';
import { Doctor } from "./Doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "nvarchar", length: 6 })
  name!: string;

  @OneToMany(() => Doctor, (doctor) => doctor.gender)
  doctors!: Doctor[];

  @OneToMany(() => PatientRecord, (patientRecord) => patientRecord.gender)
  users!: PatientRecord[];
}
