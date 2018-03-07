<template>
  <span class="iconwrap" :class="[iconSize, typeComputed]"></span>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 10
    },
    iconType: {
      type: Number
    },
    iconColor: {
      type: Number
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    iconSize () {
      return 'icon-' + this.size
    },
    typeComputed () {
      return this.classMap[this.iconType] + '-' + this.iconColor
    }
  }
}
</script>

<style lang='stylus'>
  @import '../../common/stylus/mixin'

  .iconwrap
    display inline-block
    margin-right 4px
    background-repeat no-repeat
    vertical-align top
    &.icon-10
      width 10px
      height 10px
      background-size 10px 10px
    &.icon-12
      width 12px
      height 12px
      background-size 12px 12px
    &.icon-16
      width 16px
      height 16px
      background-size 16px 16px
    &.decrease-1
      bg-image('decrease_1')
    &.discount-1
      bg-image('discount_1')
    &.guarantee-1
      bg-image('guarantee_1')
    &.invoice-1
      bg-image('invoice_1')
    &.special-1
      bg-image('special_1')
    &.decrease-2
      bg-image('decrease_2')
    &.discount-2
      bg-image('discount_2')
    &.guarantee-2
      bg-image('guarantee_2')
    &.invoice-2
      bg-image('invoice_2')
    &.special-2
      bg-image('special_2')
    &.decrease-3
      bg-image('decrease_3')
    &.discount-3
      bg-image('discount_3')
    &.guarantee-3
      bg-image('guarantee_3')
    &.invoice-3
      bg-image('invoice_3')
    &.special-3
      bg-image('special_3')
    &.decrease-4
      bg-image('decrease_4')
    &.discount-4
      bg-image('discount_4')
    &.guarantee-4
      bg-image('guarantee_4')
    &.invoice-4
      bg-image('invoice_4')
    &.special-4
      bg-image('special_4')
</style>
