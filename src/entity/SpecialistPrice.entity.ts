import { Hospital } from "./Hospital.entity";
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { Specialist } from "./Specialist.entity";
@Entity()
export class SpecialistPrice {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @OneToMany(() => Specialist, (specialist) => specialist.price, {
    primary: true,
  })
  specialist!: Specialist;

  @OneToMany(() => Hospital, (hospital) => hospital.specialistPrice, {
    primary: true,
  })
  hospital!: Hospital;

  @Column({ type: "float", nullable: false })
  price!: number;
}
