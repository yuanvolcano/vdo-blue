<template>
  <div class="header-bar">
    <div class="title">
      <div class="back-black" @click="back"></div>
      <span class="title-txt">{{title}}</span>
      <span v-if="operation" @click="handleClick" class="title-left-txt">{{operation}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    operation: {
      type: String
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    handleClick () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.header-bar
  width 100%
  background-color #fff
  overflow hidden
  .title
    position fixed
    left 0
    top 0
    width 100%
    height 8.17rem
    line-height 8.17rem
    background-color: #fff;
    text-align center
    font-family PingFangSC-Medium
    font-size 2.67rem
    color #333333
    border-bottom 1px solid #d8d8d8
    z-index 1000
    .title-txt
      font-weight: 700
    .title-left-txt
      float right
      margin-right 1.67rem
      font-size 2.67rem
      color #F55640
      extend-click()
</style>
