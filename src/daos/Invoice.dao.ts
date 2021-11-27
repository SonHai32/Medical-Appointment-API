import { getRepository, In, UpdateResult } from "typeorm";
import { Invoice } from "./../entity/Invoice.entity";
export interface IInvoiceDao {
  add: (invoice: Invoice) => Promise<Invoice> | undefined;
  getAll: () => Promise<Invoice[]> | undefined;
  getOne: (id: string) => Promise<Invoice | undefined>;
}

export class InvoiceDao implements IInvoiceDao {
  add(invoice: Invoice): Promise<Invoice> | undefined {
    return getRepository(Invoice).save(invoice);
  }

  getAll(): Promise<Invoice[]> | undefined {
    return getRepository(Invoice).find();
  }

  getOne(id: string): Promise<Invoice | undefined> {
    return getRepository(Invoice).findOne({ id });
  }
}
