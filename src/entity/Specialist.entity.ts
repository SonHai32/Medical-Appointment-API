import { Hospital } from "./Hospital.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialist {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false, unique: true })
  name!: string;

  @Column({ type: "nvarchar", length: 200, nullable: true })
  description!: string;
}
