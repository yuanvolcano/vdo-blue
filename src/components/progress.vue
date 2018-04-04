<template>
  <div class="progress" ref="progress">
    <div class="progress-bar" ref="progressBar" >
      {{percent | formatPercent}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number
    }
  },
  methods: {
    _getWidth (val) {
      let PWidth = this.$refs.progress.clientWidth
      this.$refs.progressBar.style.width = PWidth * val + 'px'
    }
  },
  mounted () {
    this._getWidth(this.percent)
  },
  watch: {
    percent (newVal) {
      this._getWidth(newVal)
    }
  }
}
</script>

<style lang="stylus" scoped>
.progress
  width 100%
  height 1.5rem
  background-color #D8D8D8
  position relative
  .progress-bar
    position absolute
    left 0
    top 0
    height 100%
    background-color #F55640
    text-align center
    line-height 1.5rem
    font-size 1.33rem
    color #fff
</style>
