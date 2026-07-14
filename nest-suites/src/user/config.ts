export const CONFIG_OPTIONS = Symbol('CONFIG_OPTIONS');

export interface ConfigOptions {
  vipDiscountRate: number;
  maxDiscountRate: number;
  apiKey: string;
}

export const defaultConfigOptions: ConfigOptions = {
  vipDiscountRate: 0.1,
  maxDiscountRate: 0.3,
  apiKey: 'local-dev-key',
};
