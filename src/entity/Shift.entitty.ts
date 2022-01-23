import { Doctor } from "./Doctor.entity";
import { Room } from "./Room.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Shift {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;

  @Column({ type: "datetime", nullable: false, name: "start_at" })
  startAt!: number;

  @Column({ name: "end_at", type: "datetime", nullable: false })
  endAt!: number;

  @Column({ type: "datetime", nullable: false })
  date!: Date;

  @Column({ type: "boolean", nullable: false, default: true })
  active!: Boolean;

  @ManyToOne(() => Room, (room) => room.shifts)
  room!: Room;

  @ManyToOne(() => Doctor, (doctor) => doctor.shifts)
  doctor!: Doctor;
}
