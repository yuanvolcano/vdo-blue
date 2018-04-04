<template>
  <div class="wrapper">
    <div class="search-box">
      <i class="icon-search" @click="clickQuery"></i>
      <input ref="query" @focus="focusHandle" v-model="query" class="box" :placeholder="placeholder"/>
      <i @click="clear" v-show="queryTrim" class="icon-dismiss"></i>
    </div>
    <div class="toggle-box" v-if="toggle.hasToggle">
      <span class="txt" @click="quickClick">{{toggle.txt}}</span>
      <span @click="allClick">{{toggle.all}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '花儿为何那样红'
    },
    toggle: {
      type: Object,
      default: function () {
        return {
          hasToggle: false,
          txt: '最热',
          all: '全部分类'
        }
      }
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    allClick () {
      this.$emit('all')
    },
    quickClick () {
      this.$emit('quick')
    },
    clear () {
      this.query = ''
    },
    clickQuery () {},
    focusHandle () {
      this.$emit('focus');
    }
  },
  computed: {
    queryTrim () {
      return this.query.trim()
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  margin-top -0.17rem
  height 6.42rem
  background-color #fc565b
  display flex
  align-items center
  .search-box
    flex-grow 1
    width 32.5rem
    margin 0 1.67rem
    padding-left 1.5rem
    padding-right 1.5rem
    background-color #D6503F
    height 5.17rem
    border-radius 7.33rem
    display flex
    align-items center
    justify-content center
    color #DBC08F
    font-size 2.33rem
    .icon-search
      font-size 4rem
    .box
      width 22rem
      flex-grow 1
      color #DBC08F
      height 3.33rem
      line-height 3.33rem
      background-color #D6503F
    .icon-dismiss
      font-size 2.5rem
      color $color-background
  .toggle-box
    margin-right 1.67rem
    flex-grow 1
    width 19.83em
    height 5.17rem
    border-radius 7.33rem
    background-color #D6503F
    color #DBC08F
    display flex
    align-items center
    justify-content center
    font-size 2.33rem
    .txt
      margin-right 2rem
</style>
