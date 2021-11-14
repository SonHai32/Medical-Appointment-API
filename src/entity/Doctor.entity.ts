import { Gender } from "./Gender.entity";
import { Ward } from "./Ward.entity";
import {
  Column,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Hospital } from "./Hospital.entity";
import { AcademicRank } from "./AcademicRank.entity";
import { Specialist } from "./Specialist.entity";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 20, nullable: false })
  firstname!: string;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  middlename!: string;

  @Column({ type: "nvarchar", length: 20, nullable: false })
  lastname!: string;

  @Column({ type: "datetime", nullable: false })
  birthday!: Date;

  @Column({ type: "int", width: 100, nullable: false })
  age!: number;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
  })
  phoneNumber!: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  emailAddress!: string;

  @Column({
    type: "varchar",
    length: 12,
    unique: true,
    nullable: false,
  })
  citizenIdentification!: string;

  @Column({ type: "datetime", nullable: false })
  startAt!: Date;

  @OneToOne(() => Specialist)
  @JoinColumn()
  specialist!: Specialist;

  @OneToOne(() => Ward)
  @JoinColumn()
  ward!: Ward;

  @OneToOne(() => Gender)
  @JoinColumn()
  gender!: Gender;

  @ManyToOne(() => Hospital, (hospital) => hospital.doctors)
  hospital!: Hospital;

  @ManyToMany(() => AcademicRank)
  @JoinTable()
  academicRank!: AcademicRank[];
}
