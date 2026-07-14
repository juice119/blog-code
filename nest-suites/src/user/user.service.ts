import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONFIG_OPTIONS, ConfigOptions } from './config';
import { PurchaseRecord } from './user.entity';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
    @Inject(CONFIG_OPTIONS) private readonly config: ConfigOptions,
  ) {}

  /** 구매 처리: 할인율 계산(순수 로직) → 결과를 리포지토리에 저장(부수효과). */
  async purchase(userId: string, basePrice: number, couponRate: number): Promise<PurchaseRecord> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const rate = this.userValidator.calculateDiscountRate(
      couponRate,
      user.tier,
      this.config.vipDiscountRate,
      this.config.maxDiscountRate,
    );

    const record: PurchaseRecord = {
      userId,
      finalPrice: Math.round(basePrice * (1 - rate)),
      appliedDiscountRate: rate,
    };

    await this.userRepository.upsertPurchase(record);
    return record;
  }

  /** 부수효과(토큰 삭제) 자체가 목적인 메서드 — 상호작용 검증이 정당한 케이스. */
  async revokeAccess(userId: string): Promise<void> {
    await this.userRepository.deleteToken(userId);
  }
}
