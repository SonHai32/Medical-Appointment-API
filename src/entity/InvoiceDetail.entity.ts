import { PatientSchedule } from "./PatientSchedule.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Invoice } from "./Invoice.entity";
@Entity()
export class InvoiceDetail {
  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails, {
    primary: true,
  })
  invoice!: Invoice;

  @OneToOne(() => PatientSchedule, { primary: true })
  patientSchedule!: PatientSchedule;

  @Column({ type: "float", default: 0, nullable: false })
  discount!: number;

  @Column({ type: "float", nullable: false })
  total!: number;
}
