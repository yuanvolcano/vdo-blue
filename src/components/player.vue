<template>
  <div class="wrapper">
    <div class="player">
      <video class="video" @ended="_endWatch" :src="vdoInfo.videoUrl" autoplay></video>
    </div>
    <div class="actor-info">
      <div class="left">
        <img class="vdo-img" :src="vdoInfo.videoPic">
      </div>
      <div class="middle">
        <div class="name">{{vdoInfo.brief}}</div>
        <div class="info">
          <span>{{vdoInfo.signature || vdoInfo.name  }}</span>
          <span>{{vdoInfo.watchNum | formatNum}}</span>
        </div>
      </div>
      <div :class="{'collect-active-img': vdoInfo.isCollect === 1}" class="collect collect-img" @click="_collectVideo"></div>
      <div class="right">
        <div class="attitude">
          <span :class="{'agree-active-img': vdoInfo.isClick > 0}" @click="_agreeClick" class="agree-img like"></span>
          <span :class="{'disagree-active-img': vdoInfo.isTread > 0}" @click="_disagreeClick" class="disagree-img dislike"></span>
          <progress-bar :percent="vdoInfo.rate" class="progress"></progress-bar>
        </div>
      </div>
    </div>
    <search-list :data="searchResult" :isLoad="isLoad" :operate="getMoreVedio" @select="goRecommendVideo"></search-list>
    <comment :comments="comments"></comment>
    <add-comment @publish="publish"></add-comment>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
import progressBar from './progress'
import searchList from './search-list'
import comment from './comment'
import addComment from './add-comment'
import {getVideoContent, agreeClick, disagreeClick, endWatch, getRecommendVedio, addVideoComment, getRelateComment, collectVideo} from 'api'
import {mapGetters} from 'vuex'
import {Toast, Loading} from 'vux'
import {toast} from 'base/util'

export default {
  components: {progressBar, searchList, comment, addComment, Toast, Loading},
  computed: {
    ...mapGetters(['vdoItem']),
    label () {
      let name = this.vdoInfo.name || this.vdoInfo.signature
      return name ? name + ' | ' : ''
    }
  },
  data () {
    return {
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载',
      isLoad: true,
      recommendPage: 1,
      commentPage: 1,
      recommendRows: 5,
      vdoInfo: {},
      searchResult: {
        title: '推荐',
        list: [
        ]
      },
      comments: [
        {
          name: '时光在我心中',
          comment: '好好看啊，有一部史诗巨作，有剧情，有深度，还是原创，感谢楼主，能发邮箱么',
          createTime: '2013-03-05',
          pic: ''
        },
        {
          name: '如今',
          comment: '求主演名字，求番号',
          createTime: '2013-03-05',
          pic: ''
        }
      ]
    }
  },
  created () {
    this._getVideoContent(this.$route.params.id)
    this._getRecommendVedio({page: this.recommendPage})
    this._getRelateComment({page: this.commentPage})
  },
  methods: {
    publish (value) {
      addVideoComment._post({
        comment: value.trim(),
        videoId: this.$route.params.id
      }).then(result => {
        if (result.status === 1) {
          this._getRelateComment({page: this.commentPage})
        }
      })
    },
    goRecommendVideo (item) {
      this.$router.push({path: `/player/${item.id}`})
    },
    getMoreVedio () {
      this.recommendPage++;
      this._getRecommendVedio({page: this.recommendPage})
    },
    _collectVideo () {
      this.vdoInfo.isCollect = this.vdoInfo.isCollect === 1 ? 2 : 1
      collectVideo._post({
        videoId: this.$route.params.id,
        type: this.vdoInfo.isCollect
      }).then(result => {
        if (result.status === 1) {
        }
      })
    },
    _getRelateComment (param = {}) {
      getRelateComment._post({
        videoId: this.$route.params.id,
        page: param.page,
        rows: this.recommendRows || 5
      }).then(result => {
        if (result.status === 1) {
          if (result.data.commentList && result.data.commentList.length !== 0) {
            this.comments = result.data.commentList
          } else {
            toast('没有更多评论了哦', this.tips);
          }
        }
      })
    },
    _getRecommendVedio (param = {}) {
      getRecommendVedio._post({
        videoId: this.$route.params.id,
        page: param.page,
        rows: this.recommendRows || 5
      }).then(result => {
        if (result.status === 1) {
          if (result.data.videoList.length !== 0) {
            this.searchResult.list = result.data.videoList
          } else {
            toast('没有更多视频了哦', this.tips);
          }
          if (result.data.commentList && result.data.commentList.length !== 0) {
            this.comments = result.data.commentList
          } else {
            toast('没有更多评论了哦', this.tips);
          }
        }
      })
    },
    _endWatch () {
      endWatch._post({
        videoId: this.$route.params.id
      }).then(result => {
        if (result.status === 1) {
        }
      })
    },
    _agreeClick () {
      agreeClick._post({
        videoId: this.$route.params.id,
        type: this.vdoInfo.isClick
      }).then(result => {
        if (result.status === 1) {
        }
      })
      this.vdoInfo.isClick = this.vdoInfo.isClick !== 1 ? 1 : 0
      if (this.vdoInfo.isClick) this.vdoInfo.isTread = 0
    },
    _disagreeClick () {
      disagreeClick._post({
        videoId: this.$route.params.id,
        type: this.vdoInfo.isTread
      }).then(result => {
        if (result.status === 1) {
        }
      })
      this.vdoInfo.isTread = this.vdoInfo.isTread !== 1 ? 1 : 0
      if (this.vdoInfo.isTread === 1) this.vdoInfo.isClick = 0
    },
    _getVideoContent (id) {
      getVideoContent._post({
        videoId: id
      }).then(result => {
        if (result.status === 1) {
          this.vdoInfo = result.data.videoContent
        }
      })
    }
  },
  watch: {
    $route () {
      this._getVideoContent(this.$route.params.id)
      this._getRecommendVedio()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'

.wrapper
  width 100%
  background-color #fff
  .player
    width 100%
    .video
      width 100%
      height 35.17rem
  .actor-info
    padding 1.67rem 0
    margin-left 2.5rem
    margin-right 2.5rem
    display flex
    .left
      flex-grow 0
      flex-shrink 0
      width 6rem
      height 6rem
      margin-top 0.67rem
      .vdo-img
        display block
        width 100%
        height 100%
        border-radius 50%
    .middle
      flex-grow 1
      flex-shrink 1
      margin-left 1rem
      .name
        font-size 3rem
        color #161616
        line-height 4.17rem
        font-weight 700
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .info
        color #919191
        line-height 2.75rem
    .right
      width 11.83rem
      flex-grow 0
      flex-shrink 0
      .attitude
        height 3.5em
        .like
          float left
          height 3.61rem
          width 3.61rem
          extend-click()
        .dislike
          float right
          height 3.61rem
          width 3.61rem
          extend-click()
        .progress
          float left
          margin-top 1rem
    .collect
      width 5rem
      height 5rem
      margin-right 1.5rem
      background-size 100%
</style>
