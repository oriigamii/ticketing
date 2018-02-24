// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
require("font-awesome-webpack");
Vue.config.productionTip = false

import store from './components/TodoStore.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  beforeCreate() {
    console.log('test');
    this.$store.commit('INITIALISE_STORE');
  }
})
