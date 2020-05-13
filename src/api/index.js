import axios from "axios";
import config, { URL } from "@/api/config";
import store from '@/store'
import router from '@/router'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.result.Code == '400') {
        router.push('/AccLogin')
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default class API {

  // 首页信息
  getHome(param) {
    config.data = param;
    return axios.post(`${URL}/indexshow`, {}, config);
  }

  // 资讯类型
  getNewType(param) {
    config.data = param;
    return axios.post(`${URL}/newtype`, {}, config);
  }
  // 资讯列表
  getListData(param) {
    config.data = param;
    return axios.post(`${URL}/grtNews`, {}, config);
  }
  // 新闻详情页
  getDetailData(param) {
    config.data = param;
    return axios.post(`${URL}/newsditel`, {}, config);
  }
  // 注册
  getSign(param) {
    config.data = param;
    return axios.post(`${URL}/register`, {}, config);
  }
  // 获取验证码
  getPhoneCode(param) {
    config.data = param;
    return axios.post(`${URL}/registerphonecode`, {}, config);
  }
  // 登录接口
  getLogin(param) {
    config.data = param;
    return axios.post(`${URL}/login`, {}, config);
  }
  // 修改登录密码
  getPwd(param) {
    config.data = param;
    return axios.post(`${URL}/save_pwd`, {}, config);
  }
  // 上传头像接口
  getPic(param) {
    let headers = { "Content-Type": "multipart/form-data" }
    return axios.post(`${URL}/uploadsimg`, param, headers)
  }
  // 我的专属讲师
  getTeacher(param) {
    config.data = param;
    return axios.post(`${URL}/myownteacher`, {}, config);
  }

  // 客户信息
  getUserInfo(parma) {
    config.data = parma;
    return axios.post(`${URL}/userinfo`, {}, config);
  }
  // 我的推荐
  getMyInvite(param) {
    config.data = param;
    return axios.post(`${URL}/myinviter`, {}, config);
  }
  // 分享
  getShare(param) {
    config.data = param;
    return axios.post(`${URL}/sharecode`, {}, config);
  }
  // 我的信息
  getMyInfo(param) {
    config.data = param;
    return axios.post(`${URL}/mypersonalinfo`, {}, config);
  }
  // 关于我们
  getAboutUs(param) {
    config.data = param;
    return axios.post(`${URL}/aboutus`, {}, config);
  }
  //修改沟通状态
  get_status(param) {
    config.data = param;
    return axios.post(`${URL}/change_status`, {}, config);
  }
  //搜索
  get_search(param) {
    config.data = param;
    return axios.post(`${URL}/grtNews_search`, {}, config);
  }

}
