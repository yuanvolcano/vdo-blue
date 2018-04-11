<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="player">
      <div v-if="poster" @click="playVdo" class="play-btb player-img"></div>
      <img v-if="poster" class="img-poster" :src="vdoInfo.videoPic" @click="playVdo">
      <video class="vdo" height="1" width="1"
        :class="getVideoClass"
        :poster="vdoInfo.videoPic"
        @ended="_endWatch"
        :src="vdoInfo.videoUrl"
        preload="metadata"
        playsinline
        webkit-playsinline="true"
        ref="video"></video>
    </div>
    <div class="actor-info">
      <div class="left">
        <img class="vdo-img" :src="vdoInfo.videoPic">
      </div>
      <div class="middle">
        <div class="name">{{vdoInfo.title}}</div>
        <div class="info">
          <span>{{label}}</span>
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
    <div class="recommend">
      <search-list :data="searchResult" :isLoad="isLoad" :operate="getMoreVedio" @select="goRecommendVideo"></search-list>
      <comment :comments="comments" @load="load"></comment>
    </div>
    <div class="player-footer">
      <add-comment @focus="focus" @publish="publish"></add-comment>
    </div>
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
import headerBar from './header'

export default {
  components: {headerBar, progressBar, searchList, comment, addComment, Toast, Loading},
  computed: {
    ...mapGetters(['vdoItem']),
    label () {
      let name = this.vdoInfo.name || this.vdoInfo.signature
      return name ? name + ' | ' : ''
    },
    getVideoClass () {
      if (this.poster) {
        return 'video-init'
      } else {
        return 'video'
      }
    }
  },
  data () {
    return {
      title: '视频详情',
      poster: true,
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
        // {
        //   name: '时光在我心中',
        //   comment: '好好看啊，有一部史诗巨作，有剧情，有深度，还是原创，感谢楼主，能发邮箱么',
        //   createTime: '2013-03-05',
        //   pic: ''
        // },
        // {
        //   name: '如今',
        //   comment: '求主演名字，求番号',
        //   createTime: '2013-03-05',
        //   pic: ''
        // }
      ]
    }
  },
  created () {
    this._getVideoContent(this.$route.params.id)
    this._getRecommendVedio({page: this.recommendPage})
    this._getRelateComment({page: this.commentPage})
  },
  methods: {
    load () {
      this._getRelateComment({page: ++this.commentPage, notFirst: true})
    },
    playVdo () {
      let video = this.$refs.video
      video.setAttribute('controls', 'controls')
      video.play()
      this.poster = false
    },
    focus () {
      window.setTimeout(() => {
        let pannel = document.querySelector('.player-footer')
        pannel.scrollIntoView(false)
        pannel.scrollIntoViewIfNeeded()
      }, 50)
    },
    publish (value) {
      addVideoComment._post({
        comment: value.trim(),
        videoId: this.$route.params.id
      }).then(result => {
        if (result.status === 1) {
          this._getRelateComment({page: this.commentPage})
        } else {
          toast(result.msg, this.tips)
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    goRecommendVideo (item) {
      this.$router.push({path: `/player/${item.id}`})
    },
    getMoreVedio () {
      this.recommendPage++;
      this._getRecommendVedio({page: this.recommendPage, notFirst: true})
    },
    _collectVideo () {
      this.vdoInfo.isCollect = this.vdoInfo.isCollect === 1 ? 2 : 1
      collectVideo._post({
        videoId: this.$route.params.id,
        type: this.vdoInfo.isCollect
      }).then(result => {
        if (result.status === -1) {
          toast(result.msg, this.tips)
          window.setTimeout(() => {
            this.$router.push({path: '/login'})
          }, 100)
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
            if (param.notFirst) {
              this.commentPage--
              toast('没有更多评论了哦', this.tips);
            }
          }
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
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
            if (param.notFirst) {
              toast('没有更多视频了哦', this.tips);
            }
          }
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    _endWatch () {
      endWatch._post({
        videoId: this.$route.params.id
      }).then(result => {
        if (result.status === 1) {
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    _agreeClick () {
      agreeClick._post({
        videoId: this.$route.params.id,
        type: this.vdoInfo.isClick
      }).then(result => {
        if (result.status === 1) {
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
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
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
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
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
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
    position relative
    width 100%
    height 35.17rem
    padding-top 8.17rem
    .play-btb
      position absolute
      left 1rem
      bottom 1rem
      width 7.5rem
      height 7.5rem
    .img-poster
      width 100%
      height 100%
    .video-init
      position absolute
      left 1.5rem
      bottom 1.5rem
      width 1px
      height 1px
    .video
      width 100%
      height 35.17rem
    .vdo
      background-color #333
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
      flex 1 1
      margin-left 1rem
      width 30rem
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
  .recommend
    padding-bottom 8.17rem
  .player-footer
    width 100%
    position fixed
    bottom 0
    left  0
</style>
