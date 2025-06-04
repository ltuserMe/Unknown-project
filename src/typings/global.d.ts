declare global {
  type AxiosResponseType<T = any> = Promise<{
    code: number;
    data: T;
    msg: string;
    success: boolean;
  }>;

  type AxiosPageResponseType<T = any> = AxiosResponseType<{
    current: number;
    pages: number;
    size: number;
    total: number;
    records: T[];
  }>;

  interface AxiosPageReq {
    pageNum: number;
    pageSize: number;
  }

  interface anyObj {
    [key: string]: any;
  }
}
export {};
