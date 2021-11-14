import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Province } from "./Province.entity";
import { Ward } from "./Ward.entity";

@Entity()
export class District {
  @PrimaryColumn({ type: "varchar", length: 10 })
  id!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;

  @ManyToOne(() => Province, (provice) => provice.district)
  province!: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  ward!: Ward[];
}
