import { Injectable } from '@nestjs/common';
import { UserTier } from './user.entity';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pure logic, no I/O. Q10(a) 대상: solitary/sociable 둘 다 아닌
 * 순수 유닛 테스트로 검증 (Suites 없이도 충분).
 */
@Injectable()
export class UserValidator {
  isValidEmail(email: string): boolean {
    return EMAIL_RE.test(email);
  }

  /**
   * 쿠폰 할인율과 등급 할인율은 합산하지 않고 더 큰 쪽만 적용한다(중복 적용 방지).
   * 결과는 maxDiscountRate로 상한을 둔다.
   */
  calculateDiscountRate(
    couponRate: number,
    tier: UserTier,
    vipDiscountRate: number,
    maxDiscountRate: number,
  ): number {
    const tierRate = tier === 'vip' ? vipDiscountRate : 0;
    const combinedRate = Math.max(couponRate, tierRate);
    return Math.min(combinedRate, maxDiscountRate);
  }
}
