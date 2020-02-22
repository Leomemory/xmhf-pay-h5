import Vue from 'vue'
import Router from 'vue-router'
import usersConfig from './users'
import xmhfConfig from './xmhf'
import billConfig from './bill'
import myConfig from './my'

Vue.use(Router)

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const isFree = true
const ROUTER =  new Router({
  routes: [
    ...usersConfig,
    ...xmhfConfig,
    ...billConfig,
    ...myConfig,
    {
      path: '/test',
      name: 'test',
      component: require('@/components/test').default,
      meta: {
          title: '测试页',
          isFree
      }
    }
  ]
})

ROUTER.afterEach((to, from) => {
  const {title} = to.meta
  document.title = title || ''
})

export default ROUTER;

