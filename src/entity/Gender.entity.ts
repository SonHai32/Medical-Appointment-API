import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "nvarchar", length: 3 })
  name!: string;
}
