import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: resolve => require(['components/login'], resolve)
    },
    {
      path: '/signup',
      component: resolve => require(['components/signup'], resolve)
    },
    {
      path: '/forget',
      component: resolve => require(['components/forget'], resolve)
    },
    {
      path: '/service',
      component: resolve => require(['components/service'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['components/home'], resolve),
      meta: {requiresAuth: true},
      children: [
        {
          path: 'first',
          component: resolve => require(['components/first'], resolve),
          meta: {requiresAuth: true},
          redirect: 'first/recommend',
          children: [
            {
              path: 'recommend',
              component: resolve => require(['components/recommend'], resolve),
              meta: {requiresAuth: true}
            }, {
              path: 'movie',
              meta: {requiresAuth: true},
              component: resolve => require(['components/movie'], resolve)
            }, {
              path: 'star',
              meta: {requiresAuth: true},
              component: resolve => require(['components/star'], resolve)
            }
          ]
        },
        {
          path: 'vip',
          meta: {requiresAuth: true},
          component: resolve => require(['components/vip'], resolve)
        },
        {
          path: 'person',
          meta: {requiresAuth: true},
          component: resolve => require(['components/person'], resolve)
        }
      ]
    },
    {
      path: '/collect',
      meta: {requiresAuth: true},
      component: resolve => require(['components/collect'], resolve)
    },
    {
      path: '/messagecenter',
      meta: {requiresAuth: true},
      component: resolve => require(['components/message-center'], resolve)
    },
    {
      path: '/feedback',
      meta: {requiresAuth: true},
      component: resolve => require(['components/feedback'], resolve)
    },
    {
      path: '/changepwd',
      meta: {requiresAuth: true},
      component: resolve => require(['components/password-change'], resolve)
    },
    {
      path: '/search',
      meta: {requiresAuth: true},
      component: resolve => require(['components/search'], resolve)
    },
    {
      path: '/player/:id',
      meta: {requiresAuth: true},
      component: resolve => require(['components/player'], resolve)
    },
    {
      path: '/starer/:id',
      meta: {requiresAuth: true},
      component: resolve => require(['components/starer'], resolve)
    },
    {
      path: '/allStar/:id',
      name: 'allStar',
      meta: {requiresAuth: true},
      component: resolve => require(['components/all-star'], resolve)
    },
    {
      path: '/allMovie/:id',
      name: 'allMovie',
      meta: {requiresAuth: true},
      component: resolve => require(['components/all-movie'], resolve)
    }
  ]
})
