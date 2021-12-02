import { Specialist } from "./Specialist.entity";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hospital } from "./Hospital.entity";
import { ManyToOne } from "typeorm";
import { Entity,  } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Hospital, hospital => hospital.services)
  hospital!: Hospital;

  @OneToOne(() => Specialist)
  @JoinColumn()
  specialList!: Specialist;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;

  @Column({ type: "float", nullable: false })
  price!: number;
}
