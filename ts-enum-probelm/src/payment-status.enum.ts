import { BaseEnum } from './base-enum.js';

export class PaymentStatusEnum extends BaseEnum<PaymentStatusEnum> {
  static readonly PAID = new PaymentStatusEnum('PAID', '결제완료');
  static readonly CANCELLED = new PaymentStatusEnum('CANCELLED', '취소');

  static override enums = {
    PAID: PaymentStatusEnum.PAID,
    CANCELLED: PaymentStatusEnum.CANCELLED,
  };

  private constructor(value: string, label: string) {
    super(value, label);
  }

  isPaid(): boolean {
    return this.value === 'PAID';
  }
}
