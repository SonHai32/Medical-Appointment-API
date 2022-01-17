import { PatientRelative } from "./PatientRelative.entity";
import { Ward } from "./Ward.entity";
import { Gender } from "./Gender.entity";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User.entity";
import { PatientSchedule } from "./PatientSchedule.entity";

@Entity()
export class PatientRecord {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 20, nullable: false })
  firstName!: string;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  middleName!: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  lastName!: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
  })
  phoneNumber!: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: true,
  })
  emailAddress!: string;

  @Column({
    type: "varchar",
    length: 12,
    nullable: false,
    unique: true,
  })
  citizenIdentification!: string;

  @Column({
    type: "datetime",
    nullable: false,
  })
  birthday!: Date;

  @Column({ type: "int", width: 3 })
  age!: number;

  @Column({ type: "nvarchar", length: 32, nullable: true })
  job!: string;

  @Column({ type: "nvarchar", length: 200, nullable: false })
  address!: string;

  @ManyToOne(() => User, (user) => user.patientRecord)
  user!: User;

  @ManyToOne(() => Gender)
  gender!: Gender;

  @ManyToOne(() => Ward, (ward) => ward.patientRecord)
  ward!: Ward;

  @OneToMany(
    () => PatientSchedule,
    (patientChedule) => patientChedule.patientRecord
  )
  patientSchedule!: PatientSchedule[];

  @OneToOne(
    () => PatientRelative,
    (patientRelative) => patientRelative.patientRecord
  )
  @JoinColumn()
  patientRelative!: PatientRelative;
}
