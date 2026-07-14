export type UserTier = 'basic' | 'vip';

export interface User {
  id: string;
  email: string;
  tier: UserTier;
}

export interface PurchaseRecord {
  userId: string;
  finalPrice: number;
  appliedDiscountRate: number;
}
