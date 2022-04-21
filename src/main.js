import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_APIPATH)
Vue.use(Antd)

Vue.config.productionTip = false
navigator.language === 'en-US' ? moment.locale('en') : moment.locale('zh-cn')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
