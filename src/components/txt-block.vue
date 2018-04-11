<template>
  <div class="wrapper">
    <div class="block" v-if="isClear">
      <div class="title">
        <span class="title-txt">{{data.title}}</span>
        <i v-if="data.del" @click="clear" class="icon-dismiss"></i>
      </div>
      <div class="body">
        <div class="item" @click="clickHandle(item)" :key="index" v-for="(item, index) in data.list">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      isClear: true
    }
  },
  methods: {
    clear () {
      this.data.list = [];
      this.isClear = false;
    },
    clickHandle (item) {
      this.$emit('cell-click', item)
    }
  }
}
</script>

<style lang="stylus" scoped>

.wrapper
  width 100%
  .block
    padding 0 2.5rem
    background-color #fff
    overflow hidden
    .title
      margin-top 2rem
      margin-bottom 2rem
      .title-txt
        font-size 2.67rem
        font-weight 700
        line-height 3.75rem
        color: #333
      .icon-dismiss
        float right
        line-height 3.75rem
        font-size 3rem
        color #666
    .body
      display flex
      justify-content flex-start
      flex-wrap wrap
      .item
        text-align center
        border-radius 2.5rem
        font-size 2.33rem
        height 4.17rem
        line-height 4.17rem
        background-color #e9e9e9
        padding-left 1rem
        padding-right 1rem
        margin-right 1.66rem
        margin-bottom 1.66rem
</style>
