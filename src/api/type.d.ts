/**
 * 接口response data类型
 */
declare interface IResponse<T = unknown> {
  code: number;
  message?: string;
  data: T;
  [key: string]: any;
}
