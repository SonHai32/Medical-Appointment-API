import { PatientSchedule } from "./PatientSchedule.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoice } from "./Invoice.entity";
@Entity()
export class InvoiceDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice!: Invoice;

  @OneToOne(() => PatientSchedule)
  @JoinColumn()
  patientSchedule!: PatientSchedule;

  @Column({ type: "float", default: 0, nullable: false })
  discount!: number;

  @Column({ type: "float", nullable: false })
  total!: number;
}
