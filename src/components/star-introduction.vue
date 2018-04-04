<template>
  <div class="introduction">
    <div class="item">
      <div class="left">
        <img class="img" :src="data.pic">
      </div>
      <div class="right">
        <div class="star-name">
          <span class="chinese">{{data.name}}</span>
          <!-- <span class="english">{{data.engName}}</span> -->
        </div>
        <div class="star-nation">{{data.brief}}</div>
        <div class="star-works">
          <span class="tips">代表作品：{{data.portfolio}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object
    }
  },
  computed: {
    data () {
      return this.dataList
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'

.introduction
  width 100%
  padding-top 3rem
  background-color #f4f5f7
  .item
    margin 0 2.75rem 0
    padding-bottom 2rem
    display flex
    .left
      flex-grow 0
      flex-shrink 0
      width 19.17rem
      height 23rem
      margin-right 3rem
      .img
        width 100%
        height 100%
    .right
      flex-grow 1
      flex-shrink 1
      width 49rem
      .star-name
        padding-top 1rem
        .chinese
          font-size 2.5rem
          line-height 3.33rem
          color #333
          margin-right 2rem
        .english
          font-size 2rem
          line-height 3.33rem
          color #999
      .star-nation
        color #666
        font-size 2.33rem
        line-height 3.33rem
      .star-works
        color #2a2a2a
        font-size 2.33rem
        line-height 3.33rem
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 3
        overflow hidden
        .tips
          color #999
</style>
