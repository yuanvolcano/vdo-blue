<template>
  <div class="starList">
    <div class="list">
      <div v-if="items.title" class="title">
        <span class="title-txt" v-text="items.title"></span>
        <span class="title-arrow next-img" @click="goNext"></span>
      </div>
      <div class="body">
        <div v-for="(item, index) in items.list" @click="handlClick(item)" :key="index" class="item">
          <div class="item-content">
            <img class="vdo-img" @error="errorSrc" v-lazy="item.pic">
          </div>
          <div class="item-description">
            <div class="vdo-name">
              {{item.name}}
            </div>
            <div class="vdo-playinfo">
              <span class="vdo-play-time">
                {{item.brief}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isChange && items.list.length" @click="loadmore" class="footer">
        <div class="change-img change"></div>
      </div>
      <div class="default" v-if="!items.list.length">{{items.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorSrc: 'this.src="' + require('assets/images/default@2x.png') + '"'
    }
  },
  props: {
    items: {
      type: Object
    },
    isChange: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    loadmore () {
      this.$emit('load')
    },
    handlClick (item) {
      this.$emit('to-star', item)
    },
    goNext () {
      this.$emit('next')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'

  .starList
    width 100%
    // padding-bottom 8.17rem
    .list
      width 100%
    .title
      width 100%
      height 8.83rem
      background-color #fff
      display flex
      align-items center
      justify-content space-between
      .title-txt
        font-weight: 700
        font-size 2.83rem
        color: #333333;
        margin-left 1.67rem
      .title-arrow
        float right
        width 3.5rem
        height 3.5rem
        margin-right 1.67rem
    .body
      padding 0 1.67rem
      display flex
      justify-content space-between
      flex-wrap wrap
      background-color #fff
      .item
        flex-shrink 0
        width 49%
        height 28.42rem
        .item-content
          position relative
          width 100%
          height 17.58rem
          .vdo-img
            width 100%
            height 100%
            display block
            object-fit contain
            object-position center
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
        .item-description
          width 100%
          height 10.84rem
          background-color #fff
          .vdo-name
            margin-left 1.67rem
            font-size 2.5rem
            color #0A0A0A
            line-height 4.5rem
          .vdo-playinfo
            margin-left 1.67rem
            line-height 2.75rem
            font-size 2rem
            .vdo-play-time
              color #969696
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
    .footer
      height 5rem
      background-color #fff
      .change
        height 5rem
        width 5rem
        margin 0 auto
    .default
      text-align center
      font-size 2.83rem
      color #666
      background-color #fff
      padding 2rem 0
</style>
