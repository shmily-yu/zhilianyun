import Qs from "qs";
let host = process.env.VUE_APP_HOST//环境变量
export const URL = host == 'production' ? "http://crm.zjzhilianyun.com/api.php/Main" : "/api";
export default {
  url: "",
  baseURL: "",
  method: "POST",
  traditional: true,
  transformRequest: [
    function (data) {
      data.CustData = JSON.stringify(data.CustData);
      data = Qs.stringify(data);
      return data;
    }
  ],
  transformResponse: [
    function (data) {
      return data;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: {},
  paramsSerializer: function (params) {
    return Qs.stringify(params);
  },
  data: {},
  timeout: 30000,
  withCredentials: true,
  responseType: "json",
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  maxRedirects: 5
};
