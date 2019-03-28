import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import index from './components/index.vue';
import product from './components/product.vue';

export default new Router({
  routes: [
      {
          path:"/",
          name:"index",
          component:index,
      },{
          path:"/product",
          name:"product",
          component:product
      }
  ]
})