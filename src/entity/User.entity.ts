import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { PatientRecord } from "./PatientRecord.entity";
import { Role } from "./Role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  id!: string;

  @Column({ type: "nvarchar", length: 50, nullable: false })
  fullname!: string;

  @Column({
    type: "varchar",
    length: 10,
    unique: true,
    nullable: false,
  })
  phoneNumber!: string;

  @Column({
    type: "varchar",
    length: 64,
    unique: true,
    nullable: false,
  })
  emailAdress!: string;

  @Column({
    type: "varchar",
    length: 32,
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  password!: string;

  @Column({ type: "datetime", nullable: false })
  dateCreated!: Date;

  @Column({ type: "boolean", default: true, nullable: false })
  active!: number;

  @OneToOne(() => Role)
  @JoinColumn()
  role!: Role;

  @OneToMany(() => PatientRecord, (patientRecord) => patientRecord.userAccount)
  patientRecord!: PatientRecord[];
}
