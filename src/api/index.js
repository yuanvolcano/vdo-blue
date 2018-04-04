import axios from 'axios'
import querystring from 'querystring'

// http://172.20.177.33:20880/websale/openapi/rest?method=jdy.systemprofile.list&dbid=30000
class Api {
  constructor (url) {
    // var apiPath = 'http://64.32.25.10:8080'
    this.url = `LANCER/${url}`
  }
  // prototype
  _get (param, options) {
    return new Promise((resolve, reject) => {
      axios.get(this.url + '&' + querystring.encode(param), options).then(result => {
        resolve(result.data)
      }).catch(error => {
        reject(error)
      })
    });
  }
  _post (data, options) {
    return new Promise((resolve, reject) => {
      axios.post(this.url + '?' + querystring.stringify(data), data, options).then(result => {
      // axios.post(this.url, data, options).then(result => {
        resolve(result.data)
      }).catch(error => {
        reject(error)
      })
    });
  }
}

export let regist = new Api('basic/basicController/registAction') // 注册
export let getCode = new Api('basic/basicController/sendEmail') // 获取验证码
export let loginAction = new Api('basic/basicController/loginAction') // 登录
export let feedback = new Api('basic/basicController/feedback') // 提交反馈
export let changePwd = new Api('basic/basicController/updatePassword') // 修改密码
export let logOutAction = new Api('basic/basicController/logOutAction') // 注销
export let getBanner = new Api('basic/basicController/getBanner') // 获取banner
export let getRelateVideo = new Api('video/videoController/getRecommend') // 获取推荐列表
export let getVideoContent = new Api('video/videoController/getVideoContent') // 获取视频内容
export let agreeClick = new Api('video/videoController/videoClick') // 点赞
export let disagreeClick = new Api('video/videoController/videoTread') // 反对
export let endWatch = new Api('video/videoController/videoEnd') // 结束观看
export let getRecommendVedio = new Api('video/videoController/getRelateVideo') // 获取推荐视频
export let addVideoComment = new Api('video/videoController/videoComment') // 添加评论
export let getRelateComment = new Api('video/videoController/getVideoComment') // 获取评论
export let collectVideo = new Api('basic/basicController/collectVideo') // 收藏视频
export let getCollectVideo = new Api('basic/basicController/getCollectVideo') // 获取收藏视频列表
export let searchVideo = new Api('video/videoController/recommendSearch') // 推荐搜索
export let getVideoList = new Api('video/videoController/getVideoList') // 获取电影专区列表
export let getStarList = new Api('video/starController/getStarList') // 获取明星专区列表
export let getStarDetail = new Api('video/starController/getStarDetail') // 获取明星详情
export let getStarSortList = new Api('video/starController/getStarSortList') // 获取明星分类
export let getVideoSortList = new Api('video/videoController/getVideoSortList') // 获取电影详情
