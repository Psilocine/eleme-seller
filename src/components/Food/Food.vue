<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref='food'>
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <Title :title='food.name' />
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food='food'></Cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop='addFirst' v-show='!food.count || food.count === 0'>加入购物车</div>
          </transition>
        </div>
        <Split v-show="food.info" />
        <div class="info" v-show="food.info">
          <Title :title="'商品信息'" />
          <p class="text">{{food.info}}</p>
        </div>
        <Split/>
        <div class="rating">
          <Title :title="'商品评价'" />
          <Ratingselect :selectType='selectType'
                        @select-type-change='selectTypeChange'
                        :onlyContent='onlyContent'
                        @only-content-change='onlyContentChange'
                        :desc='desc'
                        :ratings='food.ratings' />
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" :key='rating.subCode' class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div v-else class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from '../Cartcontrol/Cartcontrol'
import Split from '../Split/Split'
import { formatDate } from 'common/js/date'
import Ratingselect from '../Ratingselect/Ratingselect'
import Title from 'components/Title/Title'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    // 用户评论和按钮联动
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    addFirst () {
      this.$set(this.food, 'count', 1)
    },
    selectTypeChange (type) {
      this.selectType = type
    },
    onlyContentChange () {
      this.onlyContent = !this.onlyContent
    },
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    Cartcontrol,
    Split,
    Ratingselect,
    Title
  }
}
</script>

<style lang='stylus'>
  @import '../../common/stylus/mixin.styl'

  .food
    position fixed
    left 0
    top 0
    bottom 48px
    width 100%
    background #fff
    z-index 8
    transition all linear .2s
    transform translate3d(0, 0, 0)
    opacity 1
    &.move-enter,
    &.move-leave-to
      transform translate3d(100%, 0, 0)
      opacity 0
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 10px
        background rgba(7, 17, 27, .5)
        border-radius 50%
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        margin-bottom 8px
        font-weight 700
      .detail
        height 10px
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count,
        .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          padding-right 12px
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
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        height 24px
        padding 0 12px
        line-height 24px
        font-size 10px
        box-sizing border-box
        border-radius 12px
        color #ffffff
        background rgb(0, 160, 220)
        z-index 10
        transition all .2s
        opacity 1
        &.fade-enter,
        &.fade-leave-to
          opacity 0
    .info
      padding 18px
      .title
        margin-bottom 6px
      .text
        padding 0 8px
        line-height 24px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      .title
        margin-left 18px
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              margin-right 6px
              font-size 10px
              color rgb(147, 153, 159)
              vertical-align top
            .avatar
              display inline-block
              border-radius 50%
              vertical-align top
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            .icon-thumb_up,
            .icon-thumb_dowm
              margin-right 4px
              line-height 16px
              font-size 12px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147, 153, 159)
</style>
