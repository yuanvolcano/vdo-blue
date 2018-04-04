<template>
  <div class="wrapper">
    <div v-if="data.title" class="title">{{data.title}}</div>
    <div v-for="(item, index) in data.list" :key="index" @click="clickHandle(item)" class="content">
      <div class="left">
        <div class="vdo-name">
          {{item.title}}
        </div>
        <div class="vdo-playinfo">
          <span class="vdo-author">{{item.name}}</span>
          <span class="vdo-play-time">
            {{item.watchNum | formatNum }}
          </span>
          <span class="vdo-play-agree">
            {{item.rate | formatPercent}}
          </span>
        </div>
      </div>
      <div class="right">
        <img :src="item.videoPic" >
        <div class="vdo-timelen">
          {{item.videoTime | formatTime}}
        </div>
      </div>
    </div>
    <div v-if="isLoad" class="footer">
      <span @click="operate" class="load-more">更多精彩视频</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    isLoad: {
      type: Boolean,
      default: false
    },
    operate: {
      type: Function
    }
  },
  methods: {
    clickHandle (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'

.wrapper
  width 100%
  background-color #fff
  .title
    padding 1rem 0rem
    margin-left 2.5rem
    font-size 2.83rem
    line-height 4rem
    color #333
  .content
    padding 2.5rem 0
    margin-left 2.5rem
    display flex
    justify-content flex-start
    align-items center
    flex-wrap wrap
    -webkit-tap-highlight-color transparent
    .left
      width 34rem
      height 10.67rem
      flex-grow: 1
      .vdo-name
        // margin-left 1.67rem
        font-size 2.83rem
        color #0A0A0A
        line-height 3.33rem
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
      .vdo-playinfo
        margin-top 1.8rem
        line-height 2.75rem
        font-size 2rem
        .vdo-play-time
          color #969696
          margin-left 0.5rem
        .vdo-play-agree
          float right
          margin-right 1.67rem
          position relative
          &:before
            position absolute
            content: ''
            width 2.2rem
            height 2.2rem
            left -3rem
            top 0.2rem
            background-size 2.2rem
            bg-image('../assets/images/like')
    .right
      flex-grow: 0
      width 18.83rem
      height 10.67rem
      position relative
      img
       width 100%
       height 100%
      .vdo-timelen
        position absolute
        width 6rem
        height 2rem
        border-radius 5.67rem
        background rgba(0,0,0,0.20)
        right 1.67rem
        bottom 1rem
        line-height 2rem
        text-align center
        font-size 1.5rem
        color #fff
  .footer
    background-color #fff
    font-size 2rem
    line-height 2.75rem
    padding 2rem 0
    text-align center
    .load-more
      position relative
      &:after
        position absolute
        content: ''
        width 3.67rem
        height 3.67rem
        left -5rem
        top -0.67rem
        bg-image('../assets/images/loadmore')
</style>
