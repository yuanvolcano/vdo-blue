<template>
  <div class="wrapper">
    <div class="title">
        <div class="back" @click="back"></div>
        <span>注册</span>
    </div>
    <div class="register-body">
       <group class="group">
        <x-input class="ipt" title="title" @on-focus="focus" v-model="name" type="email" placeholder="请输入昵称" is-type="email" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img name-img"></div>
           </div>
        </x-input>
      </group>
      <group class="group">
        <x-input class="ipt" title="title" @on-focus="focus" v-model="username" type="email" placeholder="请输入邮箱" is-type="email" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img email-img"></div>
           </div>
        </x-input>
      </group>
      <div class="login-width sign-username">
        <div class="login-width verify-width">
          <div class="user-email">
            <div class="user-email-img security-img"></div>
            <div class="user-email-input">
                <input v-model='code' class="email-ipt verify-ipt" type="text" placeholder="请输入验证码">
            </div>
          </div>
        </div>
        <div @click="_getCode" :class="{'disable': countDown}" class="login-width verify-code">
          <span ref="txt">{{txt}}</span>
        </div>
      </div>
      <group class="group">
        <x-input class="ipt" title="title" @on-focus="focus" v-model="userpwd" type="password" placeholder="请输入密码" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img pwd-img"></div>
           </div>
        </x-input>
      </group>
      <group class="group">
        <x-input class="ipt" title="title" @on-focus="focus" @on-blur="blurHanle" v-model="repeatpwd" type="password" placeholder="请确认密码" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img pwd-img"></div>
           </div>
        </x-input>
      </group>
      <div :class="{'disable': disable || loading}" class="login-width now-signup" @click="_registerHandle" ref="btns">
        <span>立即注册</span>
      </div>
      <div class="service">
        <check-icon :value.sync="checked">注册即代表已阅读并同意</check-icon>
        <span @click="goService" class="service-item">服务条款</span>
      </div>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading"></loading>
    </div>
  </div>
</template>

<script>
import { regist, getCode } from 'api/index'
import { XInput, Group, CheckIcon, Toast, Loading } from 'vux'
import {toast, emailReg} from 'base/util'

export default {
  components: {
    Group,
    XInput,
    CheckIcon,
    Toast,
    Loading
  },
  data () {
    return {
      name: '',
      username: '',
      userpwd: '',
      repeatpwd: '',
      code: '',
      checked: false,
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      txt: '获取验证码',
      countDown: 0
    }
  },
  computed: {
    disable () {
      if (!this.name.trim() || !this.username.trim() || !this.userpwd.trim() || !this.code.trim() || !this.repeatpwd.trim()) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (!!this.$route.query && this.$route.query.isagree) {
      this.checked = true
    }
  },
  methods: {
    focus () {
      window.setTimeout(() => {
        let pannel = document.querySelector('.register-body')
        pannel.scrollIntoView(false)
        pannel.scrollIntoViewIfNeeded()
      }, 50)
    },
    blurHanle () {
      if (this.repeatpwd !== this.userpwd) {
        this.tips.show = true;
        this.tips.text = '两次密码不一致请重新输入'
      }
    },
    back () {
      this.$router.go(-1)
    },
    goService () {
      this.$router.push('/service')
    },
    validate () {
      this.tips.text = ''
      if (this.username.trim() === '') {
        this.tips.text = '请输入昵称'
      } else if (this.username.trim() === '') {
        this.tips.text = '请输入邮箱'
      } else if (!emailReg.test(this.username)) {
        this.tips.text = '请输入正确的邮箱'
      } else if (this.code.trim() === '') {
        this.tips.text = '请输入验证码'
      } else if (this.userpwd === '') {
        this.tips.text = '请输入密码'
      } else if (this.repeatpwd === '') {
        this.tips.text = '请确认密码'
      } else if (this.repeatpwd !== this.userpwd) {
        this.tips.text = '两次密码不一致请重新输入'
      } else if (!this.checked) {
        this.tips.text = '请同意服务条款'
      }
    },
    _registerHandle () {
      this.validate()
      if (this.tips.text) {
        this.tips.show = true
        return
      }
      this.loading = true
      regist._post({
        name: this.name,
        email: this.username,
        password: this.userpwd,
        code: this.code
      }).then(result => {
        this.loading = false
        toast(result.msg, this.tips);
        if (result.status === 1) {
          this.$router.push('/login');
        }
      })
    },
    _getCode () {
      let self = this;
      if (this.username.trim() === '') {
        this.tips.show = true;
        this.tips.text = '请输入邮箱'
        return
      } else if (!emailReg.test(this.username)) {
        this.tips.show = true;
        this.tips.text = '请输入正确的邮箱'
        return
      }
      self.countDown = 60
      self.txt = self.countDown + 'S重新获取'
      let timer = window.setInterval(function () {
        --self.countDown;
        if (self.countDown < 1) {
          self.txt = '获取验证码'
          window.clearInterval(timer);
        } else {
          self.txt = self.countDown + 'S重新获取'
        }
      }, 1000)
      getCode._post({
        email: this.username
      }).then(result => {
        if (result.status === 1) {
          toast('已发送至邮箱', this.tips)
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
  height 100%
  .title
    position relative
    width 100%
    height 8.17rem
    line-height 8.17rem
    background-color: $color-bg-red;
    text-align center
    font-size 2.67rem;
    color #FFFFFF;
  .register-body
    margin 0 4.58rem
    .login-width
      height: 7.33rem
      border-radius: 0.17rem;
    .now-signup
      margin-top 3.5rem
      text-align center
      background #F55640
      border-radius 0.33rem
      font-size 2.5rem
      color #FFFFFF
      letter-spacing 0
      line-height 7.33rem
    .disable
      opacity 0.5
      pointer-events none
      cursor default
    .verify-width
      flex-grow 1
      flex-shrink 1
      background-color: #F4F4F4;
      margin-right 1.67em
      width 30.83rem
    .verify-code
      width 18.08rem
      background-color $color-bg-red
      border-radius 0.33rem
      text-align center
      font-size 2rem;
      color #FFFFFF;
      line-height 7.33rem
    .verify-code.disable
      background-color #666
      pointer-events none
      cursor default
      opacity 0.6
    .sign-username
      display flex
      margin-top: 3.5rem
      .user-email
        padding: 1.33rem 0 0 1rem
        display flex
        .user-email-img
          margin-left 0.67rem
          margin-right 3rem
          height: 4.67rem
          width: 4.67rem
        .user-email-input
          .verify-ipt
            background-color #f4f4f4
            height: 4.67rem
            font-size 2.33rem
            padding-right: 1rem
            margin-right 1.67rem
            width 19.78rem
            color #ccc
  .service
    background-color transparent
    margin-top 2rem
    display flex
    justify-content center
    .service-item
      margin-top 0.25rem
      margin-left 0.5rem
      color #F55640
</style>
