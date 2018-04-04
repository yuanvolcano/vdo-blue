<template>
  <div class="first">
    <div class="fixed">
      <tab-header></tab-header>
    </div>
    <div class="banner">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
      <!-- <swiper :list="list" :auto="true" :height="36rem" :loop="true"></swiper> -->
      <!-- <slider>
          <slider-item>
              <a href="javascript:void(0)">
                  <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
              </a>
          </slider-item>
          <slider-item>
              <a href="javascript:void(0)">
                  <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
              </a>
          </slider-item>
          <slider-item>
              <a href="javascript:void(0)">
                  <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
              </a>
          </slider-item>
      </slider> -->
  </div>
</template>

<script>
import tabHeader from './tab-header'
import {Swiper} from 'vux'
import {_getBanner} from 'base/util'

export default {
  components: {
    tabHeader,
    Swiper
  },
  activated () {
    _getBanner({position: 'recommend'}, this.list)
    // var reg = /(\/star)|(\/movie)/
    // if (reg.test(this.$route.fullPath)) {
    //   console.log(1)
    //   this.toggle = {
    //     hasToggle: true,
    //     all: '全部分类'
    //   }
    // } else {
    //   this.toggle = {}
    // }
  },
  data () {
    return {
      list: [],
      toggle: {}
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.first
  width 100%
  .fixed
    width 100%
    position fixed
    left 0
    top 0
    z-index 100
  .banner
    margin-top 5.08rem
</style>
