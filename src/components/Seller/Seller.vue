<template>
  <div class="seller" ref='seller'>
    <div class="seller-content">
      <div class="overview">
        <Title :title='seller.name' />
        <div class="desc">
          <Star :size='36' :score='seller.score' />
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <div class="title">起送价</div>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <div class="title">商家配送</div>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <div class="title">平均配送时间</div>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click='toggleFavorite'>
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favorite ? '已收藏' : '收藏'}}</span>
        </div>
      </div>
      <Split />
      <div class="bulletin">
        <Title :title="'公告与活动'" />
        <div class="content-wrapper border-1px">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item border-1px" v-for="(item, index) in seller.supports" :key="item.subCode">
            <Iconwrap :size=16 :iconType='seller.supports[index].type' :iconColor=4 />
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <Split />
      <div class="pics">
        <Title :title="'商家实景'" />
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.subCode">
              <img :src="pic" width="120" height="90" />
            </li>
          </ul>
        </div>
      </div>
      <Split />
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li v-for="info in seller.infos" :key="info.subCode" class="info-item">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from 'components/Star/Star'
import Split from 'components/Split/Split'
import BScroll from 'better-scroll'
import store from 'common/js/store.js'
import Iconwrap from 'components/Iconwrap/Iconwrap'
import Title from 'components/Title/Title'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        return store.load(this.seller.id, 'favorite')
      })()
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
    if (this.seller.pics) {
      let picWidth = 120
      let margin = 6
      let width = (picWidth + margin) * this.seller.pics.length - margin
      this.$refs.picList.style.width = width + 'px'
      this.$nextTick(() => {
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      })
    }
  },
  methods: {
    toggleFavorite () {
      this.favorite = !this.favorite
      store.save(this.seller.id, 'favorite', this.favorite)
    }
  },
  components: {
    Star,
    Split,
    Iconwrap,
    Title
  }
}
</script>

<style lang='stylus'>
  @import '../../common/stylus/mixin.styl'
  .seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        margin-bottom 8px
      .desc
        padding-bottom 18px
        font-size 0
        border-1px(rgba(7, 17, 27, .1))
        .star, .text
          display inline-block
          vertical-align top
          font-size 10px
        .star
          margin-right 8px
        .text
          margin-right 12px
          line-height 18px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border 0 none
          .title
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7, 17, 27)
            .stress
              font-size 24px
      .favorite
        position absolute
        right 18px
        top 18px
        width 36px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
      .content-wrapper
        padding 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, .1))
        .content
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
      .supports
        .supports-item
          padding 16px 12px
          font-size 0
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &:last-child
              margin 0
    .info
      padding 18px 18px 0 18px
      .title
        padding-bottom 12px
        border-1px(rgba(7, 17, 27, .1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        color rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
</style>
