<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <div class="item">
        <div class="item-left message-center-img"></div>
        <div class="item-right">
          <div class="item-top">
            <span class="system-info">系统消息</span>
            <span class="system-date">2018年2月13日</span>
          </div>
          <div class="item-bottom">
            <span class="system-txt">收到这条消息的小伙伴，现在连续购买包月VIP将享受5元的优惠</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-left message-center-img"></div>
        <div class="item-right">
          <div class="item-top">
            <span class="system-info">系统消息</span>
            <span class="system-date">2018年2月13日</span>
          </div>
          <div class="item-bottom">
            <span class="system-txt">收到这条消息的小伙伴，现在连续购买包月VIP将享受5元的优惠</span>
          </div>
        </div>
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
      title: '消息中心'
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"

  .wrapper
    width 100%
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
