<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    placeholder: {
      type: String,
      default: '花儿为何那样红'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"

  .search-box
    display: flex
    margin-left 2.33rem
    margin-right 2.33rem
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 0.5rem
    height: 3.33rem
    background-color: #D6503F
    border-radius: 0.5rem
    .icon-search
      font-size 2rem
      color: $color-background
    .box
      flex: 1
      margin: 0 0.5rem
      line-height: 1.5rem
      background-color: #D6503F
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 1.33rem
      color: $color-background
</style>
