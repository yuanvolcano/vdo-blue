<template>
  <div class="comment-bar">
    <div class="box">
      <span @click="goComments" class="edit edit-img"></span>
      <input placeholder="写评论。。。" @focus="goComments" v-model="value" class="edit-ipt" type="text">
    </div>
    <div @click="goComments" class="message feedback-img">
      <div v-if="num" class="commentNum">{{num}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goComments () {
      this.$emit('goComments')
    }
  }
}
</script>

<style lang="stylus" scoped>

.comment-bar
  padding 0 2.33rem
  border-top 1px solid #ccc
  height 8.17rem
  background-color #fff
  display flex
  align-items center
  .box
    flex 1 1
    background #F4F5F7
    border 1px solid #ccc
    border-radius 8.33rem
    height 5.33rem
    width 48.33rem
    display flex
    align-items center
    .edit
      margin-left 1.5rem
      width 2.38rem
      height 2.38rem
    .edit-ipt
      height 3.08rem
      font-size 2.17rem
      line-height 3.08rem
      padding 1rem 0 1rem 1.67rem
      background #f4f5f7
      flex 1
      margin-right 3rem
      &:hover
        border none
        outline none
  .message
    position relative
    margin-left 1.67rem
    width 3.33rem
    height 3.33rem
    .commentNum
      position absolute
      top -0.5rem
      right -0.5rem
      width 2rem
      height 2rem
      border-radius 50%
      background #f55640
      color #fff
      line-height 2rem
      text-align center
      font-size 1.5rem
</style>
