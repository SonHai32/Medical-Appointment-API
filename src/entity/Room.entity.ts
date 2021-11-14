import { Hospital } from "./Hospital.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Shift } from "./Shift.entitty";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 64 })
  name!: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.room)
  hospital!: Hospital;

  @OneToMany(() => Shift, (shift) => shift.room)
  shifts!: Shift[];
}
