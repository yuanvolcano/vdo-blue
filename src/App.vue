<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/js/flexible_css.debug.js'
import './assets/js/flexible.debug.js'

export default {
  name: 'App'
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "assets/stylus/variable.styl"

  #app
    color $color-text-footer
    width 100%
    height 100%
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
