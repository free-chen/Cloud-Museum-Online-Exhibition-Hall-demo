import Vue from 'vue'

import "normalize.css"

import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Viewer from 'v-viewer'

import '@/icons'
import "@/styles/index.scss"
import 'swiper/dist/css/swiper.css'
import 'viewerjs/dist/viewer.css'

Vue.use(MintUI, {size: 'small'});
Vue.use(VModal);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
