/**
 * 接口response data类型
 */
declare interface IResponse<T = unknown> {
  code: number;
  msg?: string;
  message?: string;
  data: T;
  [key: string]: any;
}
