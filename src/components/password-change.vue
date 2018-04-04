<template>
  <div class="wrapper">
    <header-bar :title="title" :operation="operation" @save="save"></header-bar>
    <div class="body">
      <div class="item">
        <span class="item-txt">原密码:</span>
        <input v-model="oldPwd" class="ipt-pwd" type="password" placeholder="请输入当前账号密码">
      </div>
      <div class="item">
        <span class="item-txt">新密码:</span>
        <input v-model="newPwd" class="ipt-pwd" type="password" placeholder="请输入当前新密码">
      </div>
      <div class="item">
        <span class="item-txt">确认密码:</span>
        <input v-model="repeat" class="ipt-pwd" type="password" placeholder="请再确认一次新密码">
      </div>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
import headerBar from './header'
import {changePwd} from 'api'
import {Toast, Loading} from 'vux'
import {toast} from 'base/util'

export default {
  components: {headerBar, Toast, Loading},
  data () {
    return {
      title: '密码修改',
      operation: '提交',
      oldPwd: '',
      newPwd: '',
      repeat: '',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在保存'
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    save () {
      if (this.oldPwd === '') {
        this.tips.show = true;
        this.tips.text = '请输入旧密码'
        return
      } else if (this.newPwd === '') {
        this.tips.show = true;
        this.tips.text = '请输入新密码'
        return
      } else if (this.repeat === '') {
        this.tips.show = true;
        this.tips.text = '请确认新密码'
        return
      } else if (this.newPwd !== this.repeat) {
        this.tips.show = true;
        this.tips.text = '两次密码不一致，请确认'
        return
      }
      this.loading = true
      changePwd._post({
        oldPassword: this.oldPwd,
        newPassword: this.newPwd
      }).then(result => {
        this.loading = false
        if (result.status === 1) {
          toast('保存成功，请重新登陆', this.tips)
          window.setTimeout(() => {
            this.$router.push({path: '/login'})
          }, 1000)
        } else {
          toast(result.msg, this.tips)
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"

  .wrapper
    width 100%
    .title
      position relative
      width 100%
      height 8.17rem
      line-height 8.17rem
      background-color: #fff;
      text-align center
      font-family PingFangSC-Medium
      font-size 2.67rem
      color #333333
      border-bottom 1px solid #d8d8d8
      .title-txt
        font-weight: 700
      .title-left-txt
        float right
        margin-right 1.67rem
        font-size 2.67rem
        color #F55640
    .body
      width 100%
      margin-top 8.17rem
      .item
        height 11.4rem
        background-color #fff
        display flex
        align-items center
        border-bottom 1px solid #f4f4f4
        font-size 2.67rem
        .item-txt
          margin-left 3.33rem
          color: #999999;
          width 13.33rem
        .ipt-pwd
          color: #ccc;
          margin-left 0.67rem
          padding 1rem
          background-color yellow
  input:hover
    border 1px solid #666
</style>
