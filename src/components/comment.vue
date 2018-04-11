<template>
  <div class="comment">
    <div class="item" v-for="(comment, index) in comments" :key="index">
      <div class="left">
        <img class="commenter-img" src="../assets/images/logo@2x.png" alt="">
      </div>
      <div class="right">
        <div class="user-name">{{comment.name}}</div>
        <div class="user-comment">{{comment.comment}}</div>
        <div class="comment-time">{{comment.date}}</div>
      </div>
    </div>
    <div v-if="isChange && comments.length" @click="loadmore" class="footer">
      <div class="change-img change"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array
    },
    isChange: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    loadmore () {
      this.$emit('load')
    }
  }
}
</script>

<style lang="stylus" scoped>

.comment
  width 100%
  margin-top 3rem
  background-color #fff
  .item
    margin 0 2.75rem 0
    padding-bottom 2rem
    display flex
    .left
      flex-grow 0
      flex-shrink 0
      width 6rem
      height 6rem
      border-radius 50%
      margin-right 1.5rem
      margin-top 1.5rem
      .commenter-img
        width 100%
        height 100%
        border-radius 50%
    .right
      flex-grow 1
      flex-shrink 1
      width 49rem
      .user-name
        font-size 2.33rem
        line-height 4.33rem
        color #406499
      .user-comment
        color #212121
        font-size 2.83rem
        line-height 4rem
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 3
        overflow hidden
      .comment-time
        color #212121
        font-size 2rem
        line-height 4rem
  .footer
    height 5rem
    background-color #fff
    .change
      height 5rem
      width 5rem
      margin 0 auto
</style>
