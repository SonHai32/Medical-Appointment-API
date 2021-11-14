import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Country } from "./Country.entity";
import { District } from "./District.entity";

@Entity()
export class Province {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  name!: string;

  @ManyToOne(() => Country, (country) => country.province)
  country!: Country;

  @OneToMany(() => District, (district) => district.province)
  district!: District[];
}
