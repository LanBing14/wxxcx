// pages/user-index/home-ewm/home-ewm.js
import HomeInform from '../../../api/user-index/home-inform'
import StorageUtils from "../../../utils/storageUtils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    viewImgUrl:getApp().globalData.viewImgUrl,
    CustomBar: getApp().globalData.CustomBar,
    companyName:'',
    userInfo:{},
    orUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getORMessage()
    
  },
  // 上拉刷新
  onRefresh() {
    let that = this;
    setTimeout(() => {
      // 数据成功后，停止下拉刷新
      that.setData({
        triggered: false,
      })
    }, 1000);
    that.getORMessage();
  },
  getORMessage(){
    var that = this
    let data = StorageUtils.get(StorageUtils.key.userInfo);
    this.setData({
      companyName:data.companyName,
      userInfo:data
    })
    HomeInform.$getQR().then(res => {
      if(res.code == 1){
        that.setData({
          orUrl: res.result
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration: 3000
        })
      }
    })
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
