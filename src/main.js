// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'assets/stylus/index.styl'
import 'vue-ydui/dist/ydui.base.css';

Vue.use(VueLazyload, {
  loading: require('assets/images/default@3x.png'),
  error: require('assets/images/default@3x.png')
})

fastclick.attach(document.body)
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/' || to.fullPath === '/login') {
    next()
  } else {
    let token = window.sessionStorage.getItem('token')
    // if (to.meta.requiresAuth && !store.state.loginInfo.token) {
    if (to.meta.requiresAuth && (!token || token === null)) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
