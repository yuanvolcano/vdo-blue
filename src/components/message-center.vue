<template>
  <div class="center">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <div @click="handle(item)" class="item" :key="key" v-for="(item, key) in message">
        <div class="item-left message-center-img"></div>
        <div class="item-right">
          <div class="item-top">
            <span class="system-info">{{item.title}}</span>
            <span class="system-date">{{item.time}}</span>
          </div>
          <div class="item-bottom">
            <span class="system-txt">{{item.text}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isMask" @click="cancel" class="message">
      <div class="box">
        {{content}}
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from './header'

export default {
  components: {headerBar},
  data () {
    return {
      isMask: false,
      content: '',
      title: '消息中心',
      message: [{
        title: '系统消息',
        time: '2018-2-13',
        text: '收到这条消息的小伙伴，现在连续购买包月VIP将享受5元的优惠'
      }]
    }
  },
  methods: {
    handle (item) {
      this.isMask = true
      this.content = item.text
    },
    cancel () {
      this.isMask = !this.isMask
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"

  .center
    width 100%
    height 100%
    .message
      width 100%
      height 100%
      background-color rgb(22, 22, 22)
      position absolute
      left 0
      top 0
      // right 0
      // bottom 0
      z-index 100
      .box
        width 100%
        box-sizing border-box
        padding 1rem 2.33rem
        font-size 2.33rem
        line-height 4rem
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        background-color #fff
    .body
      width 100%
      margin-top 8.17rem
      .item
        height 11.4rem
        width 100%
        border-bottom 2px solid #f4f4f4
        background-color #fff
        display flex
        align-items center
        .item-left
          flex-grow 0
          margin-left 1.67rem
          width 8rem
          height 8rem
          background-position center
          background-repeat no-repeat
        .item-right
          flex-grow 1
          flex-shrink 1
          width 45rem
          margin-left 2.40rem
          margin-right 1.67rem
          .item-top
            height 3.75rem
            line-height 3.75rem
            .system-info
              float left
              font-size 2.67rem
              color #333333
            .system-date
              float right
              font-size 2rem
          .item-bottom
            height 3.75rem
            line-height 3.75rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            .system-txt
              font-size 2rem
</style>
