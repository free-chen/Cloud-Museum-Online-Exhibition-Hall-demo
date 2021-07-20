import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'pano'
      }
    },
    {
      path: '/pano',
      name: 'pano',
      component: () => import('./views/pano/index.vue')
    }
  ]
})
