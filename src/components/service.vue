<template>
  <div class="wrapper">
    <div class="blue blue-img"></div>
    <div class="protocol">
      <h2 class="title">
        服务协议
      </h2>
      <div class="content">
        <p class="item-txt">一、本协议为确保房屋及其设施安全与完好及租赁期间内相关费用之如期结算，甲乙双方同意本合同保证金为元 </p>
        <p class="item-txt">二、租赁期满后，乙方迁空点清，交还房屋及设施，并付清所应付费用后，经甲方确认</p>
        <p class="item-txt">三、并房屋内设施无损坏后应将保证金无息退还乙方。 </p>
        <p class="item-txt">四、房屋租赁期间相关费用说明  乙方租赁期间，水、电、燃气、电话、其它由乙方居住而产生的费用由乙方负担。租赁结束时，乙方须交清欠费。</p>
        <p class="item-txt">五、租赁期间发生的伤害因乙方使用不当造成的人身意外伤害与甲方无关</p>
        <p class="item-txt">六、房屋租赁期间相关费用说明  乙方租赁期间，水、电、燃气、电话、其它由乙方居住而产生的费用由乙方负担。租赁结束时，乙方须交清欠费。</p>
        <p class="item-txt">七、租赁期间发生的伤害因乙方使用不当造成的人身意外伤害与甲方无关</p>
        <p class="item-txt">八、房屋租赁期间相关费用说明  乙方租赁期间，水、电、燃气、电话、其它由乙方居住而产生的费用由乙方负担。租赁结束时，乙方须交清欠费。</p>
        <p class="item-txt">九、租赁期间发生的伤害因乙方使用不当造成的人身意外伤害与甲方无关</p>
      </div>
    </div>
    <div @click="confirm" class="button confirm">确定</div>
    <div @click="cancel" class="button cancel">取消</div>
  </div>
</template>

<script>
export default {
  methods: {
    cancel () {
      this.$router.replace({path: '/signup', query: {isagree: false}});
    },
    confirm () {
      this.$router.push({path: '/signup', query: {isagree: true}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  .blue
    height 34.5rem
    width 100%
  .protocol
    margin -10rem 2.5rem 0
    height 50.33rem
    background-color #efefef
    color #333
    border-radius 0.17rem
    overflow auto
    font-size 2.33rem
    line-height 3.75rem
    .title
      text-align center
      font-size 2.67rem
      font-weight 700
      line-height 4.75rem
    .item-txt
      text-indent 2em
  .button
    margin 4rem 2.5rem 0
    border-radius 0.33rem
    text-align center
    line-height 7.33rem
    height 7.33rem
    background-color #F55640
    color #fff
  .cancel
    color #333
    margin-top 2rem
    background-color #efefef
</style>
