<template>
  <div class="login login-img">
    <div class='user-img logo-img'></div>
    <div class='login-box'>
      <group class="group">
        <x-input class="ipt" title="title" v-model="username" type="email" @on-focus="focus" placeholder="请输入邮箱" is-type="email" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img email-img"></div>
           </div>
        </x-input>
      </group>
      <group class="group">
        <x-input class="ipt" title="title" v-model="userpwd" @on-focus="focus" type="password" placeholder="请输入密码" required>
           <div class="clearfix" slot="label">
             <div class="user-email-img pwd-img"></div>
           </div>
        </x-input>
      </group>
      <div class="login-width login-button">
        <div class="login-tips">
          <a @click.stop='signAccount' href="javascript:void(0)" class="sign-info sign-account">注册账号</a>
          <a @click.stop='forget' href="javascript:void(0)" class="sign-info forget-pwd">忘记密码?</a>
        </div>
        <div :class="{'disable': loading || disable}" class="login-width login-btn" @click="clickLogin" ref="btns">
          <span class='btn'>登录</span>
        </div>
      </div>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading>
    </div>
  </div>
</template>

<script>
import {loginAction} from 'api/index'
import {XInput, Group, Toast, Loading} from 'vux'
import {toast, emailReg} from 'base/util'
import {mapMutations} from 'vuex'

export default {
  components: {
    XInput,
    Group,
    Toast,
    Loading
  },
  data () {
    return {
      username: '',
      userpwd: '',
      errorTips: '用户名或密码错误',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在登录'
    }
  },
  computed: {
    disable () {
      if (!this.username.trim() || !this.userpwd.trim()) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    if (userInfo) {
      this.username = userInfo.username
      this.userpwd = userInfo.userpwd
    }
  },
  methods: {
    ...mapMutations({
      setLogin: 'SET_LOGININFO'
    }),
    focus () {
      window.setTimeout(() => {
        let pannel = document.querySelector('.login-box')
        pannel.scrollIntoView(false)
        pannel.scrollIntoViewIfNeeded()
      }, 50)
    },
    clickLogin () {
      if (this.username.trim() === '') {
        this.tips.show = true;
        this.tips.text = '请输入邮箱'
        return
      } else if (!emailReg.test(this.username)) {
        this.tips.show = true;
        this.tips.text = '请输入正确的邮箱'
        return
      } else if (this.userpwd === '') {
        this.tips.show = true;
        this.tips.text = '请输入密码'
        return
      }
      this.loading = true;
      // this.$router.replace({path: '/home/first'})
      loginAction._post({
        email: this.username,
        password: this.userpwd
      }).then(result => {
        this.loading = false;
        if (result.status === 1) {
          window.sessionStorage.setItem('token', result.data.token)
          window.localStorage.setItem('userInfo', JSON.stringify({'username': this.username, 'userpwd': this.userpwd}))
          this.$router.replace({path: '/home/first'})
        } else {
          toast(result.msg, this.tips)
        }
      })
    },
    signAccount () {
      this.$router.push('/signup')
    },
    forget () {
      this.$router.push('/forget')
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .login
    width: 100%
    height: 100%
    background-size 100% !important
    overflow auto
    .user-img
      margin: 16.25rem auto 0
      width: 18rem
      height: 18rem
    .login-box
      margin: 11.5rem auto 0
      height: 30.91rem
      width: 53.33rem
      .login-width
        width: 53.33rem
        height: 7.33rem
      .login-username
        border-radius: 2px
        background-color: #F4F4F4
      .user-email
        padding: 1.33rem 0 0 1.67rem
        .user-email-img
          float left
          marigin-left 1.67rem
          height: 4.67rem
          width: 4.67rem
          // bg-image('email')
          background-repeat: no-repeat
          background-position: center center
        .user-email-input
          float right
          .email-ipt
            background-color #f4f4f4
            width 42.28rem
            height: 4.67rem
            padding-left: 1rem
            padding-right: 1rem
            margin-right 1.67rem
          .errorTips
            position relative
            bottom -1.5rem
            left 1rem
            color #F55640
      .login-userpassword
        border-radius: 2px
        margin-top: 2.5rem
        background-color: #F4F4F4
      .login-button
        height: 13.75rem
        .login-tips
          padding-top: 0.84rem
          width: 100%
          .sign-info
            line-height 2.75rem
            font-family: PingFangSC-Regular;
            font-size: 2rem;
            letter-spacing: 0;
          .sign-account
            padding-left: 0.84rem
            color: #F55640;
            extend-click()
          .forget-pwd
            float: right
            padding-right: 0.84rem
            color: #FFFFFF;
        .login-btn
          margin-top: 2.83rem
          // opacity 0.5
          background-color #F55640
          border-radius 0.33rem
          text-align center
          font-family PingFangSC-Medium
          font-size 2.5rem
          letter-spacing 0
          line-height 7.33rem
          .btn
            color #FFF
        .login-btn.disable
          opacity 0.5
          pointer-events none
          cursor default
  .error
    background-color: #888;
    padding: 1rem;
    border-radius: 0.33rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform translate(-50%, -50%)

</style>
