import { getRepository } from "typeorm";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm";
import { PaymentMethod } from "../entity/PaymentMethod.entity";

export interface IPaymentMethodDao {
  add: (paymentMethod: PaymentMethod) => Promise<PaymentMethod> | undefined;
  update: (paymentMethod: PaymentMethod) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<PaymentMethod | undefined>;
  getAll: () => Promise<PaymentMethod[]> | undefined;
}

export class PaymentMethodDao implements IPaymentMethodDao {
  add(paymentMethod: PaymentMethod): Promise<PaymentMethod> | undefined {
    return getRepository(PaymentMethod).save(paymentMethod);
  }

  update(paymentMethod: PaymentMethod): Promise<UpdateResult> | undefined {
    return getRepository(PaymentMethod).createQueryBuilder().update(paymentMethod).execute()
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(PaymentMethod).delete(listID);
  }

  getOne(id: string): Promise<PaymentMethod | undefined> {
    return getRepository(PaymentMethod).findOne(id);
  }

  getAll(): Promise<PaymentMethod[]> | undefined {
    return getRepository(PaymentMethod).find();
  }
}
