import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    mobile_phone: sessionStorage.getItem('mobile_phone') ? sessionStorage.getItem('mobile_phone') : '',
    createcode: sessionStorage.getItem('createcode') ? sessionStorage.getItem('createcode') : '',
    LOADING: false,
    phoneReg: /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  },

  mutations: {
    // 存储token
    set_token(state, token) {
      localStorage.removeItem('token')
      state.token = token;
      localStorage.setItem('token', token)
    },
    // 存储手机号
    set_mobile_phone(state, mobile_phone) {
      sessionStorage.removeItem('mobile_phone')
      state.mobile_phone = mobile_phone;
      sessionStorage.setItem('mobile_phone', mobile_phone)
    },
    // 存储邀请码
    set_createcode(state, createcode) {
      sessionStorage.removeItem('createcode')
      state.createcode = createcode;
      sessionStorage.setItem('createcode', createcode)
    },
    // 全屏加载
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    
   

  },
  actions: {
  },
  modules: {
  }
})
