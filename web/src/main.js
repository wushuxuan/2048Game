import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router';
import Store from './components/store.js'
import Vuex from 'Vuex';
import routes from './router/index';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter);

const store = new Vuex.Store(Store)
const router = new VueRouter({
  routes
})

router.beforeEach(({path}, from, next) => {
  next();
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
