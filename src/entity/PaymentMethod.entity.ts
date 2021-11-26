import { title } from "process";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 32, nullable: false })
  name!: string;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  title!: string;

  @Column({ type: "nvarchar", length: 200, nullable: true })
  description!: string;
}
