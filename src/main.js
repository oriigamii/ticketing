// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vSelect from 'vue-select'
/* import moment from 'moment'
*/
import VueFlashMessage from 'vue-flash-message'
import store from './components/InterventionStore.js'
Vue.use(VueFlashMessage)
require('vue-flash-message/dist/vue-flash-message.min.css')
Vue.component('v-select', vSelect)
require('font-awesome-webpack')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  beforeCreate () {
    this.$store.commit('INITIALISE_STORE')
  }
})
