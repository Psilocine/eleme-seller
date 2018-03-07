<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/Header/Header'
import data from 'common/json/data.json'
import { urlParse } from 'common/js/util'

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created () {
    if (data) {
      this.seller = data.seller
    } else {
      this.$http.get('https://www.easy-mock.com/mock/5a8bbef0956ed0635799cb7f/example/elemeData').then(response => {
        response = response.body
        this.seller = response.seller
      })
    }
    this.seller = Object.assign({}, this.seller, {id: 11})
  },
  name: 'App',
  components: {
    'v-header': Header
  }
}
</script>

<style lang='stylus'>
  @import 'common/stylus/mixin.styl'
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
