import { Injectable } from '@nestjs/common';
import { PurchaseRecord, User } from './user.entity';

/**
 * 실제 I/O 없는 in-memory 구현이지만, "리포지토리 레이어의 규칙"을
 * 검증하는 Q10(c) 대상이라는 점에서 solitary 목킹 대상이 아니라
 * createTestingModule 기반 통합 테스트로 검증한다.
 */
@Injectable()
export class UserRepository {
  private readonly users = new Map<string, User>();
  private readonly purchases: PurchaseRecord[] = [];
  private readonly issuedTokens = new Set<string>();

  constructor() {
    this.users.set('u1', { id: 'u1', email: 'basic@example.com', tier: 'basic' });
    this.users.set('u2', { id: 'u2', email: 'vip@example.com', tier: 'vip' });
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  /** userId 기준 UPSERT: 이미 있으면 갱신, 없으면 추가 — 중복 저장 방지. */
  async upsertPurchase(record: PurchaseRecord): Promise<void> {
    const existingIndex = this.purchases.findIndex((p) => p.userId === record.userId);
    if (existingIndex >= 0) {
      this.purchases[existingIndex] = record;
    } else {
      this.purchases.push(record);
    }
  }

  async getPurchases(userId: string): Promise<PurchaseRecord[]> {
    return this.purchases.filter((p) => p.userId === userId);
  }

  async issueToken(userId: string): Promise<void> {
    this.issuedTokens.add(userId);
  }

  async deleteToken(userId: string): Promise<void> {
    this.issuedTokens.delete(userId);
  }

  hasToken(userId: string): boolean {
    return this.issuedTokens.has(userId);
  }
}
