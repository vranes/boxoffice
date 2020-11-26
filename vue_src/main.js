import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootrstrapVue from 'bootstrap-vue'
import'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootrstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
