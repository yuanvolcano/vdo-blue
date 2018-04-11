<template>
  <div class="feedback">
    <header-bar :title="title" :operation="operation" @save="save"></header-bar>
    <div class="body">
      <div class="contact-way">
        <input type="number" v-model="qq" class="ipt-qq" placeholder="联系QQ">
      </div>
      <div class="suggestion">
        <div class="suggestion-box">
          <textarea v-model="issue" type="text" class="ipt-feedback" placeholder="遇到的问题及建议"></textarea>
        </div>
      </div>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import {Toast, Loading} from 'vux'
import {feedback} from 'api'
import {toast} from 'base/util'

export default {
  components: {headerBar, Toast, Loading},
  data () {
    return {
      title: '意见反馈',
      operation: '提交',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      text: '正在提交',
      loading: false,
      qq: '',
      issue: ''
    }
  },
  methods: {
    save () {
      let qqReg = /^\d{6,10}$/
      if (!qqReg.test(this.qq)) {
        toast('请输入正确的qq号', this.tips)
        return
      } else if (this.issue.trim() === '') {
        toast('请输入需要反馈的问题', this.tips)
        return
      }
      this.loading = true
      feedback._post({
        issue: this.issue
      }).then(result => {
        this.loading = false
        toast(result.msg, this.tips)
        if (result.status === 1) {
          this.issue = ''
          this.qq = ''
        } else {
          toast(result.msg, this.tips)
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"

  .feedback
    width 100%
    height 100%
    background-color #eee
    .body
      width 100%
      margin-top 8.17rem
      .contact-way
        height 11.4rem
        background-color #fff
        display flex
        justify-content center
        align-items center
        .ipt-qq
          width 53.33rem
          height 5.33rem
          line-height 7.33rem
          font-size 2.67rem
          color #CCCCCC
          padding 1rem
      .suggestion
        padding-left 1.67rem
        padding-right 1.67rem
        height 22rem
        background-color #fff
        border-top 1px solid #d8d8d8
        .suggestion-box
          border-top 1px solid #f4f4f4
          height 18rem
          display flex
          justify-content center
          align-items center
          padding 1rem
        .ipt-feedback
          border none
          width 53.33rem
          height 18rem
          line-height 3.75rem
          font-size 2.67rem
          color #CCCCCC
</style>
