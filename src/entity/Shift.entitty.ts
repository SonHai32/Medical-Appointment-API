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
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;

  @Column({ type: "int", nullable: false, name: "start_at" })
  startAt!: number;

  @Column({ name: "end_at", type: "int", nullable: false })
  endAt!: number;

  @Column({ type: "datetime", nullable: false })
  date!: Date;

  @Column({ type: "boolean", nullable: false, default: true })
  active!: Boolean;

  @ManyToOne(() => Room, (room) => room.shifts)
  room!: Room;

  @OneToOne(() => Doctor)
  @JoinColumn()
  doctor!: Doctor;
}
