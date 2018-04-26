<template>
  <div class="wrapper-vip">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <div class="top">
        <div v-for="(item, index) in vipList" :key="index" :class="{'checked-bg': index === checkIndex}" @click="checkVIP(index)"  class="item">
          <div class="item-title">{{item.title}}</div>
          <div class="item-content">
            <div :class="{'gou-img': index === 0, 'nian-img': index === 1, 'da-img': index === 2, 'ji-img': index === 3}" class="content-left"></div>
            <div class="content-right">
              <div class="content-top">
                <span class="content-info">{{item.info}}</span>
                <span class="content-price">{{item.price | prices}}</span>
              </div>
              <div class="content-bottom">
                <span class="content-txt">{{item.description}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="payment-way">
          <span class="select active"></span>
          <span class="payment alipay-img"></span>
        </div>
      </div>
      <div class="privilege">
        <div class="privilege-title">VIP会员特权</div>
        <ul class="privilege-body">
          <li v-for="(item, index) in options" :key="index" class="privilege-item">
            <div class="item-bg">
              <div class="vip-id-img"></div>
            </div>
            <div class="item-txt">{{item}}</div>
          </li>
        </ul>
      </div>
      <div class="confir-pay">
        <div class="total">总计： 35元</div>
        <div class="confirm">确认付款</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import base from 'base/mixin'

export default {
  mixins: [base],
  components: {headerBar},
  data () {
    return {
      title: 'VIP',
      scrollY: 0,
      checkIndex: 0,
      vipList: [
        {
          title: '全年VIP',
          info: '感恩用户，佳节巨惠',
          price: 613,
          description: '送两个月VIP+再送10天VIP'
        },
        {
          title: '半年VIP',
          info: '感恩用户，佳节巨惠',
          price: 613,
          description: '送两个月VIP+再送10天VIP'
        },
        {
          title: '季度VIP',
          info: '感恩用户，佳节巨惠',
          price: 613,
          description: '送两个月VIP+再送10天VIP'
        },
        {
          title: '一个月VIP',
          info: '感恩用户，佳节巨惠',
          price: 613,
          description: '送两个月VIP+再送10天VIP'
        }
      ],
      options: [
        '尊贵身份', 'VIP收藏', '多端同步', '精品资源'
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    checkVIP (index) {
      this.checkIndex = index
    }
  },
  filters: {
    prices (value) {
      return '¥' + value.toFixed(2)
    }
  },
  watch: {}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .wrapper-vip
    width 100%
    .body
      width 100%
      padding 8.17rem 0
      .top
        width 100%
        .item.checked-bg
          z-index 2
          background-color rgba(223, 245, 24, 0.2)
        .item
          padding-top 1.92rem
          padding-left 2.33rem
          background-color #fff
          z-index 2
          .item-title
            height 3.75rem
            line-height 3.75rem
            font-size 32px
            color #333333
            font-weight 700
          .item-content
            display flex
            margin-top 0.33rem
            overflow hidden
            .content-left
              flex-grow 0
              width 7.67rem
              height 7.67rem
            .content-right
              flex-grow 1
              width 45rem
              height 7.67rem
              margin-left 2.5rem
              margin-right 2.34rem
              .content-top
                width 100%
                height 3.75rem
                .content-info
                  float left
                  font-size 32px
                  color #333
                  line-height 3.75rem
                .content-price
                  float right
                  font-size 34px
                  line-height 4rem
              .content-bottom
                font-size 32px
                color $color-bg-red
                line-height 3.75rem
      .middle
        width 100%
        height 13.16rem
        overflow hidden
        .payment-way
          margin-top 4.25rem
          overflow hidden
          .select
            float left
            width 3.33rem
            height 3.33rem
            // border 1px solid $color-bg-red
            // border-radius 50%
            margin-left 2.33rem
            margin-top 0.71rem
          .select.active
            bg-image('../assets/images/select')
            background-repeat no-repeat
            background-position center
          .payment
            float left
            width 13.33rem
            height 4.75rem
            margin-left 1.67rem
      .privilege
        padding-left 2.33rem
        padding-right 2.33rem
        .privilege-title
          color #000
          font-size 32px
          font-weight 700
        .privilege-body
          margin-top 2rem
          width 100%
          display flex
          flex-wrap wrap
          .privilege-item
            flex-shrink 1
            width 50%
            box-sizing border-box
            border 1px solid #f4f4f4
            height 13.67rem
            text-align center
            .item-bg
              height 5.02rem
              margin-top 3.18rem
              .vip-id-img
                margin 0 auto
                height 5.02rem
                width 5.02rem
            .item-txt
              line-height 2.33rem
              font-size 20px
              color #999999
          .privilege-item:nth-child(1)
            border-bottom none
            border-right none
          .privilege-item:nth-child(2)
            border-bottom none
          .privilege-item:nth-child(3)
            border-right none
      .confir-pay
        margin-top 3rem
        height 8.33rem
        line-height 8.33rem
        width 100%
        font-size 32px
        color #FFFFFF
        .total
          float left
          height 100%
          width 66.6666666%
          text-align center
          font-size 32px
          color #FFFFFF
          background-color #666666
        .confirm
          float left
          height 100%
          width 33.3333333%
          text-align center
          background #EC543F
</style>
