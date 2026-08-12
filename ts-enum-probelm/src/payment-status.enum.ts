import { BaseEnum } from './base-enum.js';

export class PaymentStatusEnum extends BaseEnum<PaymentStatusEnum> {
  static readonly PAID = new PaymentStatusEnum('PAID', '결제완료');
  static readonly CANCELLED = new PaymentStatusEnum('CANCELLED', '취소');

  static map = {
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

export type PaymentStatusKey = 'PAID' | 'CANCELLED';

// --- demo ---
const status = PaymentStatusEnum.getStatus('PAID');
console.log(status.label, status.isPaid()); // 결제완료 true
console.log(PaymentStatusEnum.values().map((s) => s.value)); // ['PAID', 'CANCELLED']
console.log(PaymentStatusEnum.PAID === status); // true, identity intact
