import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class AcademicRank {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: "varchar", length: 32, nullable: false, unique: true })
  fullname!: string;

  @Column({type: 'nvarchar', length: 6, nullable: false, unique: true})
  shortname!: string

  @Column({type: 'nvarchar', length: 64, nullable: true})
  description!: string
}
