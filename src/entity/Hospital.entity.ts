import { Specialist } from "./Specialist.entity";
import { Ward } from "./Ward.entity";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Room } from "./Room.entity";
import { Doctor } from "./Doctor.entity";
import { Service } from "./Service.entity";

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 64 })
  name!: string;

  @Column({ type: "nvarchar", length: 200 })
  address!: string;

  @ManyToOne(() => Ward, (ward) => ward.hospital)
  ward!: Ward;

  @OneToMany(() => Room, (room) => room.hospital)
  room!: Room[];

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctors!: Doctor[];

  @OneToMany(() => Service, service => service.hospital)
  services!: Service[]
}
