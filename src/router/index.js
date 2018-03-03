import Vue from 'vue'
import Router from 'vue-router'
import InterventionList from '@/components/InterventionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InterventionList',
      component: InterventionList
    }
  ]
})
