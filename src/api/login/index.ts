import { http } from "@/utils/http";
export function loginApi(data?: anyObj): Promise<AxiosResponseType> {
  return http.request({
    url: "/api/login",
    method: "post",
    data
  });
}
