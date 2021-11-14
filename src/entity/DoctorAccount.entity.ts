import { Doctor } from "./Doctor.entity";
import {
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Column, Entity } from "typeorm";
@Entity()
export class DoctorAccount {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 32, unique: true, nullable: false })
  username!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  password!: String;

  @Column({ type: "date", nullable: false })
  createdAt!: Date;

  @OneToOne(() => Doctor)
  @JoinColumn()
  doctor!: Doctor;
}
