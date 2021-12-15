import ParkApi from "../../../api/parkApi";
import Conf from "../../../config/conf";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    viewFile: Conf.httpUrl.viewFile,
    appImgUrl: getApp().globalData.appUrl,
    viewImgUrl: getApp().globalData.viewImgUrl,
    extendStrBtn: false,
    extendStr: true,
    showMore:false,
    text:'',
    txtTitle:'',
    previewImage:[]
  },
  /**活动报名 */
  bm_btn() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading()
    ParkApi.$getInformationDetail(options.id).then(res => {
      if (res.code == 1) {
        that.setData({
          detail: res.result,
          text:res.result.NOTICE_CONTENT,
          txtTitle: that.replaceSpecialChar(res.result.NOTICE_TITLE)
        },()=>{
          that.updataExtendShow()
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: "none",
          duration: 3000
        })
      }

      wx.hideLoading()
    })
  },
  previewImage(e) {
    var src = [];
    for (var i = 0; i < this.data.previewImage.length; i++) {
      src[i] = this.data.previewImage[i];
    }
    wx.previewImage({
      current: src[0],
      urls: src
    })
  },

  replaceSpecialChar(url) {
    url = url.replace(/&quot;/g, '"');
    url = url.replace(/&ldquo;/g, '"');
    url = url.replace(/&rdquo;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&lt;/g, '<');
    url = url.replace(/&gt;/g, '>');
    url = url.replace(/&nbsp;/g, ' ');
    return url;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.updataExtendShow()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
    // this.updataExtendShow()
  },

  // 打开预览
  showFile(tempFilePath,fileType){
    wx.openDocument({
      filePath: tempFilePath,
      fileType:fileType,
      complete:function(e){
      }
    })
  },
  downloadImg(e){

    var that = this
    // wx.showLoading({
    //   title:'下载中...'
    // })
    let {url} = e.currentTarget.dataset;
    let isImg = url.substring(url.lastIndexOf(".")+1) =='png'||url.substring(url.lastIndexOf(".")+1) =='jpg'||url.substring(url.lastIndexOf(".")+1) =='jpeg'
    let fileType = url.substring(url.lastIndexOf(".")+1)
    
    wx.downloadFile({
        url:  this.data.viewImgUrl + url,//图片的地址 
        header: {
          'content-type': 'application/' + fileType
        },
        filePath: wx.env.USER_DATA_PATH + '/file.' + fileType,  
        success:function(res){
          
          var tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
         

          if( isImg){
            wx.previewImage({
              current:  that.data.viewImgUrl + url,
              urls: [that.data.viewImgUrl + url],
              // showmenu: false,
            })
         
    //         wx.saveImageToPhotosAlbum({
    //           filePath: res.filePath,  //设置下载图片的地址
    
    //           success:function(){
    //               wx.showToast({
    //                 title: '图片保存成功',
    //                 duration:2000
    //               })

    //           },
    //           fail(err){
    // 　　　　　　　　if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
    // 　　　　　　　　　　wx.showModal({
    // 　　　　　　　　　　　　title: '提示',
    // 　　　　　　　　　　　　content: '需要您授权保存相册',
    // 　　　　　　　　　　　　showCancel: false,
    // 　　　　　　　　　　　　success: modalSuccess => {
    // 　　　　　　　　　　　　　　wx.openSetting({
    // 　　　　　　　　　　　　　　　　success(settingdata) {
    // 　　　　　　　　　　　　　　　　　　if (settingdata.authSetting['scope.writePhotosAlbum']) {
    // 　　　　　　　　　　　　　　　　　　　　console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    // 　　　　　　　　　　　　　　　　　　}else {
    // 　　　　　　　　　　　　　　　　　　　　console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    // 　　　　　　　　　　　　　　　　　　}
    // 　　　　　　　　　　　　　　　　}
    // 　　　　　　　　　　　　　　})
    // 　　　　　　　　　　　　}
    // 　　　　　　　　　　})
    // 　　　　　　　　}else{
    //                 wx.showToast({
    //                   title: '保存失败',
    //                   icon: 'error',
    //                   duration:  1000
    //                   })
    //                 console.log('保存失败：', err)
    //               }
    //           },　　　　　　
    //           complete:function(res){
    //             console.log(res)
    //           }
    //       })
          }else{
            that.showFile(res.filePath,fileType)
            wx.saveFile({
              tempFilePath: res.filePath,
              success:function(){
                  wx.showToast({
                    title: '文件保存成功',
                    duration:2000
                  })
              }
            })
          }
      },
      complete:function(e){
        wx.hideLoading()
      }
    })
  },
  imgtap (e) {
    var cover = this.selectComponent('#commentText') // 首张图可以作为转发封面图
    wx.previewImage({
      current: e.detail.src,
      urls: cover.imgList, // 仅预览单张图片
      showmenu: false,
    })
  },

  listenCommentUserAvatarLoad(e) {
    
    this.updataExtendShow()
  },  
  /**
   * 评论头像加载失败调用
   * @param {*} e
   */
  listenCommentUserAvatarLoadError(e) {

    this.updataExtendShow()
  },  


  // 显示更多
  tapViewExtendComment() {
    this.setData({
      extendStr: !this.data.extendStr
    })

  },
  // 最多显示12行
  updataExtendShow() {
    setTimeout(() => {
      var query = wx.createSelectorQuery()
      query
        .select(`#commentText`)
        .boundingClientRect((rect) => {
          if (rect != null) {
            const height = rect.height
            if (height > 288) { 
              this.setData({
                extendStr: true,
                showMore:true
              })
              
            } else {
              this.setData({
                showMore:false,
                extendStr: false,
              })
            }
          }
        })
        .exec()
    }, 300)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
