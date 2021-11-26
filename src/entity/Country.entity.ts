import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Province } from "./Province.entity";
@Entity()
export class Country {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({
    type: "nvarchar",
    length: 64,
    nullable: false,
  })
  name!: string;

  @OneToMany(() => Province, (provice) => provice.country)
  province!: Province[];
}
