export abstract class BaseEnum<T extends BaseEnum<T>> {
  protected constructor(
    readonly value: string,
    readonly label: string,
  ) {
    Object.freeze(this);
  }

  // NOTE: not `protected` — a `this: { map: ... }` structural type can't
  // satisfy a protected member (TS treats protected as nominal, not
  // structural). Kept internal by convention instead.
  static map: Record<string, BaseEnum<any>>;

  static getStatus<T extends BaseEnum<T>>(
    this: { map: Record<string, T> },
    key: string,
  ): T {
    const found = this.map[key];
    if (!found) throw new Error(`Invalid key: ${key}`);
    return found;
  }

  static values<T extends BaseEnum<T>>(this: { map: Record<string, T> }): T[] {
    return Object.values(this.map);
  }
}
