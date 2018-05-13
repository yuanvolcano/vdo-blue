<template>
  <div class="add-comment">
    <div class="box">
      <span class="edit edit-img"></span>
      <input placeholder="写评论。。。" v-model="value" class="edit-ipt" type="text">
    </div>
    <div class="publish" @click="publish">发表</div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
  </div>
</template>

<script>
import {Toast} from 'vux'
import {toast} from 'base/util'

export default {
  components: {Toast},
  data () {
    return {
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      value: ''
    }
  },
  methods: {
    publish () {
      if (this.value.trim()) {
        this.$emit('publish', this.value)
        this.value = ''
      } else {
        toast('请输入相关评论！', this.tips)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.add-comment
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
