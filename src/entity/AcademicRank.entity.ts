import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class AcademicRank {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: "varchar", length: 6, nullable: false, unique: true })
  name!: string;
}
