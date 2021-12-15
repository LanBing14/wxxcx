// pages/user-index/park-information/index.js
import ParkApi from "../../../api/parkApi";
import Conf from "../../../config/conf";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: getApp().globalData.CustomBar,
    viewFile: Conf.httpUrl.viewFile,
    parkList:[],
    start:1,
    size:10,
    totalPages:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList(true);
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
  onRefresh() {
    let that = this;
    setTimeout(() => {
      // 数据成功后，停止下拉刷新
      that.setData({
        triggered: false,
      })
    }, 1000);
    that.getDataList(true);
  },
   // 分页加载数据
   loadMore() {
    if (this.data.start >= this.data.totalPages) {
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration: 3000
      })
      return;
    }
    this.setData({
      start: this.data.start + 1
    });
    this.getDataList(false);
  },
  // 去详情
  handleGo(e){
    let {id} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/user-index/information-details/index?id='+id,
      })
  },

  getDataList(isRefresh = false) {
    if (isRefresh) {
      // 刷新时候 页码重置
      this.setData({
        start: 1,
        parkList:[]
      });
    }
    let that = this;
    wx.showLoading({title: '加载中...'});
    ParkApi.$getInformationList({start:this.data.start, size:this.data.size}).then(res => {
      wx.hideLoading();
      if (res.code === 1) {
        if (res.result.list.length > 0) {
          res.result.list.forEach(function (item) {
            if (item.cover && item.cover.length > 0) {
              item.coverPath = that.data.viewFile + "?path=" + item.cover[0].filePath;
            }
          });
          let parkList = this.data.parkList.concat(res.result.list)
          that.setData({
            parkList,
            totalPages:res.result.totalPages
          });
        } else {
          that.setData({
            parkList: []
          });
        }
      }
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