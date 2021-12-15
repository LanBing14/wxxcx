import RequestApi from "../../../api/requestApi";
import baseUrl from "../../../config/conf";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      visitors: {},
      visitorsId:"",
      appImgUrl:getApp().globalData.appUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      visitorsId: options.id
    })

    this.getVisitorDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  /*
  **获取详情
  */
  getVisitorDetail(){
    
   const params = {
      id: this.data.visitorsId
   };
    RequestApi.$getVisitorRegister(params).then(res =>{
       const  result =  res.result;
       result.filePath = result.qrcodes.length ? `${baseUrl.httpUrl.viewFile}?path=${result.qrcodes[0].filePath}` : "";
       this.setData({
          visitors: result
         })
   }).catch(err =>{});
  },
  jumpToVisitorAppointment(){
    wx.redirectTo({
      url: `/pages/service/visitorAppointment/visitorAppointment?id=${this.data.visitorsId}`
    })
  },
  /**
   * 下载
   */
  downFiles(){
    if(!this.data.visitors.qrcodes.length){
      return
    }
    let url  = `${baseUrl.httpUrl.viewFile}?path=${this.data.visitors.qrcodes[0].filePath}`;
    wx.downloadFile({
      url: url,
      filePath: wx.env.USER_DATA_PATH + '/' + `${this.data.visitors.qrcodes[0].fileName}`,
      success: function (res) {
      const tempFilePath = res.tempFilePath;    
      console.log(tempFilePath) 
        // 保存图片
        wx.saveImageToPhotosAlbum({
          filePath: res.filePath,
          success: function (res) {
             wx.showToast({
             title: '保存成功',
             icon: 'success',
             duration:  1000
              })
          },
          fail: function (err) {
            if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
　　　　　　　　　　wx.showModal({
　　　　　　　　　　　　title: '提示',
　　　　　　　　　　　　content: '需要您授权保存相册',
　　　　　　　　　　　　showCancel: false,
　　　　　　　　　　　　success: modalSuccess => {
　　　　　　　　　　　　　　wx.openSetting({
　　　　　　　　　　　　　　　　success(settingdata) {
　　　　　　　　　　　　　　　　　　if (settingdata.authSetting['scope.writePhotosAlbum']) {
　　　　　　　　　　　　　　　　　　　　console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
　　　　　　　　　　　　　　　　　　}else {
　　　　　　　　　　　　　　　　　　　　console.log('获取权限失败，给出不给权限就无法正常使用的提示')
　　　　　　　　　　　　　　　　　　}
　　　　　　　　　　　　　　　　}
　　　　　　　　　　　　　　})
　　　　　　　　　　　　}
　　　　　　　　　　})
            }else{
              wx.showToast({
                title: '保存失败',
                icon: 'error',
                duration:  1000
                })
              console.log('保存失败：', err)
            }

          }
        });
      },
      fail: function (err) {
        console.log('下载失败：', err);
      },
    });
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
