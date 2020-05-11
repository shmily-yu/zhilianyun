import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import API from './api'
import time from './untils/time'
import './plugins/vant.js'
import './common/common.css'
Vue.config.productionTip = false;
Vue.prototype.api = new API();
Vue.prototype.$time = time;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
