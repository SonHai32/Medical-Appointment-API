import { PatientSchedule } from "./PatientSchedule.entity";
import { Specialist } from "./Specialist.entity";
import {
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hospital } from "./Hospital.entity";
import { ManyToOne } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(
    () => PatientSchedule,
    (patientSchedule) => patientSchedule.service
  )
  patientSchedules!: PatientSchedule[];

  @ManyToOne(() => Hospital, (hospital) => hospital.services, {
    createForeignKeyConstraints: true,
  })
  hospital!: Hospital;

  @ManyToOne(() => Specialist, (specialist) => specialist.services, {createForeignKeyConstraints: true})
  specialist!: Specialist;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;

  @Column({ type: "float", nullable: false })
  price!: number;
}
