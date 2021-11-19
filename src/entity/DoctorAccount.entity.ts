import { Doctor } from "./Doctor.entity";
import {
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Column, Entity } from "typeorm";
import { dateToSqlDatetimeFormat } from "../utils/format.utils";
@Entity()
export class DoctorAccount {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: false })
  username!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  password!: string;

  @Column({
    type: "date",
    nullable: false,
    default: dateToSqlDatetimeFormat(new Date()),
  })
  createdAt!: Date;

  @Column({ type: "boolean", nullable: false, default: false })
  active!: boolean;

  @OneToOne(() => Doctor)
  @JoinColumn()
  doctor!: Doctor;
}
