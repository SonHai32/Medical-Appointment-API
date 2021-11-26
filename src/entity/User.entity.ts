import { Invoice } from './Invoice.entity';
import { dateToSqlDatetimeFormat } from "../utils/format.utils";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { PatientRecord } from "./PatientRecord.entity";
import { Role } from "./Role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 50, nullable: false })
  fullname: string = "";

  @Column({
    type: "varchar",
    length: 10,
    unique: true,
    nullable: false,
  })
  phoneNumber: string = "";

  @Column({
    type: "varchar",
    length: 64,
    unique: true,
    nullable: false,
  })
  emailAddress: string = "";

  @Column({
    type: "varchar",
    length: 32,
    unique: true,
    nullable: false,
  })
  username: string = "";

  @Column({ type: "varchar", length: 64, nullable: false })
  password: string = "";

  @Column({
    type: "datetime",
    nullable: false,
    default: dateToSqlDatetimeFormat(new Date()),
  })
  createdAt: Date = new Date();

  @Column({ type: "boolean", default: true, nullable: false })
  active: boolean = true;

  @OneToMany(() => PatientRecord, (patientRecord) => patientRecord.user)
  patientRecord!: PatientRecord[];

  @OneToMany(() => Invoice, invoice => invoice.user)
  invoices!: Invoice[]
} 
