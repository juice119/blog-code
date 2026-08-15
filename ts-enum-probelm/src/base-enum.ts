export abstract class BaseEnum<T extends BaseEnum<T>> {
  protected constructor(
    readonly value: string,
    readonly label: string,
  ) {
    Object.freeze(this);
  }

  protected static readonly  enums: Record<string, BaseEnum<any>> = {};

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
