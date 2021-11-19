import { getRepository } from "typeorm";
import { InvoiceDetail } from "./../entity/InvoiceDetail.entity";
export interface IInvoiceDetailDao {
  add: (invoiceDetail: InvoiceDetail) => Promise<InvoiceDetail> | undefined;
  getAll: () => Promise<InvoiceDetail[]> | undefined;
}

export class InvoiceDetailDao implements IInvoiceDetailDao {
  add(invoiceDetail: InvoiceDetail): Promise<InvoiceDetail> | undefined {
    return getRepository(InvoiceDetail).save(invoiceDetail);
  }

  getAll(): Promise<InvoiceDetail[]> | undefined {
    return getRepository(InvoiceDetail).find();
  }
}
