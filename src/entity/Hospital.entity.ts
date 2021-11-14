import { Ward } from "./Ward.entity";
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Room } from "./Room.entity";
import { Doctor } from "./Doctor.entity";

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 64 })
  name!: string;

  @OneToOne(() => Ward)
  @JoinColumn()
  ward!: Ward;

  @OneToMany(() => Room, (room) => room.hospital)
  room!: Room[];

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctors!: Doctor[];
}
