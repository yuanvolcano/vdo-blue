<template>
  <div class="allMovie">
    <header-bar :title="title"></header-bar>
    <scroll-nav :index="0" :height="height">
      <scroll-nav-panel :label="item.label" v-for="(item, key) in list" :key="key">
        <!-- 内容 -->
        <p>{{item.label}}</p>
        <yd-list :theme="1">
            <yd-list-item v-for="(i, index) in 10" :key="index">
                <img slot="img" src="//static.shikee.com/common/img/blank.gif">
                <span slot="title">{{item.label}} - {{item.label}}</span>
            </yd-list-item>
        </yd-list>
        <!-- 内容 -->
      </scroll-nav-panel>
    </scroll-nav>
  </div>
</template>

<script>
import base from 'base/mixin'
import {ScrollNav, ScrollNavPanel} from 'vue-ydui/dist/lib.rem/scrollnav';

export default {
  mixins: [base],
  components: {
    ScrollNav,
    ScrollNavPanel
  },
  data () {
    return {
      height: '8.17rem',
      list: [
        {label: '今日特惠'},
        {label: '烟灶推荐'},
        {label: '净水饮水推荐'},
        {label: '洗碗机推荐'},
        {label: '电热推荐'},
        {label: '燃热推荐'},
        {label: '消毒柜推荐'},
        {label: '嵌入式推荐'},
        {label: '商用电器'},
        {label: '活动说明'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.allMovie
  width 100%
  height 100%
  z-index 10
  position fixed
  left 0
  top 0
  .body
    margin-top 9.17rem
    .tab
      padding-bottom 1.5rem
      overflow-y hidden
      overflow-x auto
      height 4rem
      line-height 4rem
      background-color #fff
      .vux-tab-item
        flex 0 0 22%
      .vux-tab-ink-bar
        position absolute
        bottom 1.5rem
    .vux-tab.tab .vux-tab-item
      background #fff
    .swiper
      background-color #fff
      .swiper-item
        overflow auto
</style>
