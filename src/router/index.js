import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/Goods/Goods'
import Seller from 'components/Seller/Seller'
import Ratings from 'components/Ratings/Ratings'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/ratings',
      component: Ratings
    }
  ]
})
