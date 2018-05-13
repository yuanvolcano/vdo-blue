<template>
  <div class="personal">
    <div class="personal-top">
      <img class="personal-bg" src="../assets/images/Rectangle2.png">
      <div class="personal-info">
        <div class="personal-pic portrait-img"></div>
        <div class="personal-intro">
          <p class="personal-name">{{name}}</p>
          <span :class="{'vip': vip}" class="personal-vipmark">vip</span>
        </div>
      </div>
    </div>
    <div class="personal-bottom">
      <div @click="goCollect" class="item personal-collect">
        <div class="item-img collect-img"></div>
        <div class="item-txt">收藏</div>
        <div class="item-next next-img"></div>
      </div>
      <div @click="goMessage" class="item personal-collect">
        <div class="item-img message-img"></div>
        <div class="item-txt">消息中心</div>
        <div class="item-next next-img"></div>
      </div>
      <div @click="goFeedback" class="item personal-collect">
        <div class="item-img feedback-img"></div>
        <div class="item-txt">反馈</div>
        <div class="item-next next-img"></div>
      </div>
      <div @click="goPwdChange" class="item personal-collect">
        <div class="item-img pwdchange-img"></div>
        <div class="item-txt">密码修改</div>
        <div class="item-next next-img"></div>
      </div>
      <div @click="goAccountCan" class="item personal-collect last">
        <div class="item-img setting-img"></div>
        <div class="item-txt">账户注销</div>
        <div class="item-next next-img"></div>
      </div>
      <confirm v-model="isShow" :title="title" @on-confirm="logout">
        <div class="logout logout-img" slot="default"></div>
      </confirm>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {Confirm, Toast} from 'vux'
import {logOutAction} from 'api'
import {toast} from 'base/util'
import base from 'base/mixin'

export default {
  mixins: [base],
  components: {Confirm, Toast},
  data () {
    return {
      isShow: false,
      title: '确定注销当前账号？',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'login'
    ]),
    name () {
      console.log(this.login)
      return this.login.name || '花花姑娘'
    },
    vip () {
      return this.login.isVip
    }
  },
  methods: {
    ...mapMutations({
      setLogin: 'SET_LOGININFO'
    }),
    goCollect () {
      this.$router.push('/collect');
    },
    goMessage () {
      this.$router.push('/messagecenter');
    },
    goFeedback () {
      this.$router.push('/feedback');
    },
    goPwdChange () {
      this.$router.push('/changepwd');
    },
    goAccountCan () {
      this.isShow = true
    },
    logout () {
      logOutAction._post().then(result => {
        if (result.status === 1) {
          window.sessionStorage.removeItem('token')
          this.$router.push({path: '/login'})
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

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'

.personal
  width 100%
  padding-bottom 8.17rem
  overflow auto
  .personal-top
    width 100%
    position relative
    .personal-bg
      width 100%
      object-fit cover
      display block
    .personal-info
      position absolute
      width 100%
      height 10.5rem
      top 11rem
      .personal-pic
        float left
        margin-left 5.75rem
        width 10.5rem
        height 10.5rem
        border-radius 50%
        background-color #fff
        background-size 10.5rem !important
      .personal-intro
        float left
        margin-left 2.5rem
        .personal-name
          font-size 3.33rem
          color #333333
          font-weight bond
          line-height 4.67rem
          margin-top 1.58rem
          margin-bottom 1rem
        .personal-vipmark
          font-size 1.17rem
          padding 0.5rem
          background-color #444
          border-radius 2px
          color #fff
        .vip
          background-color yellow
  .personal-bottom
    border-top: 1rem solid #F0F0F0;
    border-bottom: 1rem solid #F0F0F0;
    .last
      border-bottom none
    .item
      height 8.5rem
      border-bottom 2px solid #F0F0F0;
      background-color #fff
      display flex
      align-items center
      .item-img
        margin-left 2.75rem
        height: 4rem
        width: 4rem
        background-position center
        background-repeat no-repeat
      .item-txt
        margin-left 1.92rem
        font-family PingFangSC-Regular
        font-size 2.5rem
        color #333333
        line-height 8.5rem
        flex 1 1
      .item-next
        width 3.5rem
        height 3.5rem
        margin-right 1.67rem
        extend-click()
  .logout
    width 5rem
    height 5rem
    margin 0 auto
    background-size contain
</style>
