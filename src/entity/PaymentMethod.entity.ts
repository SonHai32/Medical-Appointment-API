import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: "nvarchar", length: 64, nullable: false })
  name!: string;
}
