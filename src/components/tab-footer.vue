<template>
  <footer class="tab">
    <router-link tag="div" exact="exact" class="tab-item" to="/home/first" replace>
      <div :class="{'active': acitveCap}" class="link-img home-img"></div>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home/vip" replace>
      <div class="link-img vip-img active"></div>
      <span class="tab-link">开通VIP</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/home/person" replace>
      <div class="link-img person-img active"></div>
      <span class="tab-link">个人中心</span>
    </router-link>
  </footer>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      exact: true
    }
  },
  computed: {
    acitveCap () {
      var reg = /\/first/
      return reg.test(this.$route.fullPath)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .tab
    display flex
    align-items center;
    position fixed;
    left: 0;
    bottom: 0;
    width: 100%
    border-top: 1px solid #ccc
    height 8.17rem
    font-size $font-size-medium
    background-color #fff
    .tab-item
      flex 1
      text-align center
      .link-img
        width 4.67rem
        height 4.67rem
        margin 0 auto
        background-position center center
        background-repeat no-repeat
        background-size 4rem !important
      .tab-link
        font-size: 1.67rem
        padding-bottom 0.5rem
        color $color-text-footer
      &.router-link-active
        .tab-link
          color $color-bg-red
      &.router-link-active
        .vip-img.active
          bg-image('../assets/images/vip_pre')
      &.router-link-active
        .person-img.active
          bg-image('../assets/images/my_pre')
      & .home-img.active
          bg-image('../assets/images/home_pre_copy')
</style>
