import { Doctor } from './Doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "nvarchar", length: 6 })
  name!: string;

  @OneToMany(() => Doctor, doctor => doctor.gender)
  doctors!: Doctor[]
}
