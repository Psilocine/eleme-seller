<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods"
              :key="item.subCode"
              class="menu-item"
              :class="{'current': currentIndex === index}"
              @click="selectMenu(index)">
            <span class="text border-1px">
              <Iconwrap v-if="item.type > 0" :size=12 :iconType='item.type' :iconColor=3 />{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="item in goods" :key="item.subCode" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food)" v-for="food in item.foods" :key="food.subCode" class="food-item">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="control-wrapper">
                    <Cartcontrol :food='food' v-on:cart-add="_drop"></Cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Cart
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
        :select-foods='selectFoods'
        ref="cart"></Cart>
    </div>
    <Food :food='selectedFood' ref='food'></Food>
  </div>
</template>

<script>
import data from 'common/json/data.json'
import BScroll from 'better-scroll'
import Cart from '../Cart/Cart'
import Cartcontrol from '../Cartcontrol/Cartcontrol'
import Food from '../Food/Food'
import Iconwrap from '../Iconwrap/Iconwrap'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created () {
    this.goods = data.goods
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectFood (food) {
      this.selectedFood = food
      this.$refs.food.show()
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, len = foodList.length; i < len; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index) {
      // 没必要传$event, pc点击两次已经修复
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 350)
    },
    _drop (target) {
      // 体验优化, 异步执行下落动画
      this.$nextTick(() => {
        this.$refs.cart.drop(target)
      })
    }
  },
  components: {
    Cart,
    Cartcontrol,
    Food,
    Iconwrap
  }
}
</script>

<style lang='stylus'>
  @import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          width 56px
          font-size 12px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            line-height 10px
            .count
              margin-right 12px
          .price
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              font-weight 700
              color rgb(240, 20, 20)
            .old
              font-size 10px
              font-weight 700
              color rgb(147, 153, 159)
              text-decoration line-through
          .control-wrapper
            position absolute
            right 0
            bottom 12px
</style>
