// pages/user-park/space-show/index.js
import Conf from "../../../config/conf";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    imgList:[
      {url:Conf.baseUrl+'/app/mini/images/park/p1.jpg',id:1},
      {url:Conf.baseUrl+'/app/mini/images/park/p2.jpg',id:2},
      {url:Conf.baseUrl+'/app/mini/images/park/p2.png',id:3},
      {url:Conf.baseUrl+'/app/mini/images/park/p4.jpg',id:4},
      {url:Conf.baseUrl+'/app/mini/images/park/p5.jpg',id:5},
      {url:Conf.baseUrl+'/app/mini/images/park/p2_1.jpg',id:6},
      {url:Conf.baseUrl+'/app/mini/images/park/p2_2.jpg',id:7},
      {url:Conf.baseUrl+'/app/mini/images/park/p2_3.jpg',id:8},
      {url:Conf.baseUrl+'/app/mini/images/park/p2_4.jpg',id:9}
    ],
    appImgUrl:getApp().globalData.appUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
