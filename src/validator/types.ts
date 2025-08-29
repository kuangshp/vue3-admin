/**
 * 验证器函数类型接口
 * 符合Element Plus的验证规则函数格式
 */
export interface ValidatorRule {
  [key: string]: any;
}

export interface ValidatorCallback {
  (error?: Error | string): void;
}

export type ValidatorFunction = (
  rule: ValidatorRule,
  value: any,
  callback: ValidatorCallback
) => void;
