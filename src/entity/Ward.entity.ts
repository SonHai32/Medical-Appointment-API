import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { District } from "./District.entity";

@Entity()
export class Ward {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  name!: string;

  @ManyToOne(() => District, (district) => district.ward)
  district!: District;
}
