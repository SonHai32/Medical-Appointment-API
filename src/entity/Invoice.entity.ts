import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => InvoiceDetail, invoiceDetail => invoiceDetail.invoice)
  invoiceDetails!: InvoiceDetail[]
}
