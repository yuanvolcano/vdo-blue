<template>
  <div class="wrapper">
    <header class="tab">
      <router-link tag="div" exact="exact" class="tab-item" to="/home/first/recommend" replace>
        <span class="tab-link">首页推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/home/first/movie" replace>
        <span class="tab-link">电影</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/home/first/star" replace>
        <span class="tab-link">明星</span>
      </router-link>
    </header>
    <!-- <search-bar @focus="focusHandle" :toggle="toggle"></search-bar> -->
  </div>
</template>

<script>
import searchBar from './search-bar'

export default {
  props: {
    toggle: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  components: {
    searchBar
  },
  methods: {
    focusHandle () {
      this.$router.push('/search');
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.wrapper
  width 100%
  .tab
    display flex
    align-items center
    width: 100%
    height 5rem
    font-size $font-size-medium
    background-color #FC565B
    .tab-item
      flex 1
      text-align center
      .tab-link
        height 3.33rem
        line-height 3.33rem
        font-size 2.33rem
        padding-bottom 0.5rem
        color #FDE0AB
      &.router-link-active
        .tab-link
          font-size 2.67rem

.yd-slider-pagination-item
  width 1rem
  height 1rem
  margin 0.5em
</style>
