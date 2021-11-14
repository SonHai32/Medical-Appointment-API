import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Nation } from "./Nation.entity";
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

  @OneToMany(() => Nation, (nation) => nation.country)
  nation!: Nation[];

  @OneToMany(() => Province, (provice) => provice.country)
  province!: Province[];
}
