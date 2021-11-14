import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./Country.entity";

@Entity()
export class Nation {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  nationName!: string;

  @ManyToOne(() => Country, (country) => country.nation)
  country!: Country;
}
