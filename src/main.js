// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible'
import 'common/interceptors'
import fastclick from 'fastclick'
import './styles/index.scss'

import { Button, Cell, Header, Field, Toast, Tabbar, TabItem } from 'mint-ui'
Vue.component(Button.name,Button)
Vue.component(Cell.name,Cell)
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.$toast = Vue.prototype.$toast = Toast

Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
