<template>
  <div class="cartcontrol">
    <transition name='inner'>
      <div  class="cart-decrease"
            @click.stop="decreaseCart"
            v-show="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!this.food.count) {
        // Vue.set(this.food, 'count', 1)
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart-add', event.target)
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang='stylus'>
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all linear .4s
      &.inner-enter-active, &.inner-leave-active
        transform translate3d(0, 0, 0)
        opacity 1
        .inner
          transform rotate(0)
      &.inner-enter, &.inner-leave-to
        transform translate3d(24px, 0, 0)
        opacity 0
        .inner
          transform rotate(180deg)
      .inner
        display inline-block
        font-size 24px
        line-height 24px
        color rgb(0, 120, 220)
        transition all linear .4s
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      font-size 10px
      color rgb(147, 153, 159)
      text-align center
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 120, 220)
</style>
