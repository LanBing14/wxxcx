import Conf from "../../../config/conf.js";
import Property from "../../../api/user-index/property.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    CustomBar: app.globalData.CustomBar,
    imagesUrl: Conf.imagesUrl,
    listDetail:{},
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isShow:  options.STATE == '0'? false : true
    });
    this.getDataList(options.id)
  },

  getDataList(param) {
    this.setData({
      isLoading:true
    })
    let that = this;
    wx.showLoading({title: '加载中...'});
    Property.$getPropertyDetail({
      id: param,
    }).then(function (res) {
      if (res.code === 1) {
        that.setData({
          listDetail:  res.result
        });
      }
      wx.hideLoading();
      that.setData({
        isLoading:false
      })
    })
  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl,
      urls: [currentUrl] 
    })
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
