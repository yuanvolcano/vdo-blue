<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-footer></tab-footer>
  </div>
</template>

<script>
import TabHeader from 'components/tab-header'
import TabFooter from 'components/tab-footer'

export default {
  data () {
    return {}
  },
  components: {
    TabHeader,
    TabFooter
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

</style>
