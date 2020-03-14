import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import zrouter from './zrouter';

Vue.config.productionTip = false

new Vue({
  router: zrouter,
  render: h => h(App)
}).$mount('#app')
