import { PaymentMethod } from "./PaymentMethod.entity";
import { User } from "./User.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceDetail } from "./InvoiceDetail.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "datetime", nullable: false })
  createdAt!: Date;

  @Column({ type: "float", nullable: false })
  total!: number;

  @Column({ type: "nvarchar", nullable: false, length: 200 })
  status!: string;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetails!: InvoiceDetail[];

  @ManyToOne(() => User, (user) => user.invoices)
  user!: User;

  @OneToOne(() => PaymentMethod)
  @JoinColumn()
  paymentMethod!: PaymentMethod;
}
