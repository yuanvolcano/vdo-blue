<template>
  <div class="wrapper">
    <div class="box">
      <span class="edit edit-img"></span>
      <input placeholder="写评论。。。" @focus="focus" v-model="value" class="edit-ipt" type="text">
    </div>
    <div class="publish" @click="publish">发表</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    publish () {
      this.$emit('publish', this.value)
      this.value = ''
    },
    focus () {
      this.$emit('focus')
    }
  }
}
</script>

<style lang="stylus" scoped>

.wrapper
  border-top 1px solid #ccc
  width 100%
  height 8.17rem
  background-color #fff
  display flex
  align-items center
  .box
    flex-grow 1
    flex-shrink 1
    margin-left 2.33rem
    background #F4F5F7
    border 1px solid #ccc
    border-radius 8.33rem
    height 5.33rem
    width 48.33rem
    display flex
    align-items center
    .edit
      margin-left 1.5rem
      width 3.08rem
      height 3.08rem
    .edit-ipt
      height 3.08rem
      font-size 2.17rem
      line-height 3.08rem
      padding 1rem 0
      background #f4f5f7
      flex 1
      margin-right 3rem
  .publish
    margin 0 1.5rem
    width 8rem
    height 4rem
    border-radius 4px
    text-align center
    line-height 4rem
    color #fff
    background-color #448aff
</style>
