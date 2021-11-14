import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialist {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "nvarchar", length: 64 })
  name!: string;
}
