import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import usersConfig from './users'

Vue.use(Router)

// const isFree = true
const ROUTER =  new Router({
  routes: [
    ...usersConfig,
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})

ROUTER.afterEach((to, from) => {
  const {title} = to.meta
  document.title = title || ''
})

export default ROUTER;

