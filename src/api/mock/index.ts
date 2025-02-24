import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  list: Array<any>;
};

export function getListApi(params?: object): Promise<ListResult> {
  return http.request({
    url: "/list/get",
    method: "get",
    params
  });
}
// 获取列表数据的 API 函数
export const getMsgApi = (params?: object) => {
  return http.request({
    url: "/getMsg",
    method: "get",
    params
  });
};
export const addApi = (data?: object) => {
  return http.request({
    url: "/add",
    method: "post",
    data
  });
};

export function getListApiError(data?: object): Promise<ListResult> {
  return http.request({
    url: "/list/error",
    method: "post",
    data
  });
}
