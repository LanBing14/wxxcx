// pages/user-index/home-inform/index.js
import homeInform from '../../../api/user-index/home-inform';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: getApp().globalData.CustomBar,
    active: '2',
    noReadCount:0,
    miniNoticesList:[
      {
        noticeType:0,
        isRead:'no',
        noticeContent:'申报模板提醒',
        noticeTime:'2021-11-11 11:11:11',
      },

    ],
    pageNumber:1,
    totalPages:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onChange(true)
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
    this.onChange()
  },
  onRefresh() {
    let that = this;
    setTimeout(() => {
      // 数据成功后，停止下拉刷新
      that.setData({
        triggered: false,
      })
    }, 1000);
    that.getList(true);
  },
   // 分页加载数据
   loadMore() {
    if (this.data.pageNumber >= this.data.totalPages) {
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration: 3000
      })
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1
    });
    this.getList(false);
  },
  // 去详情页面
  handelOpen(e){
    const {detail} = e.currentTarget.dataset;
    if(detail.isRead == '0'){
      wx.showLoading()
      homeInform.$getchangeStatue({id: detail.id}).then(res => {
        wx.hideLoading()
        wx.navigateTo({
          url: '../inform-details/index?detail=' + JSON.stringify(detail),
        })
      })
    }else{
      wx.navigateTo({
        url: '../inform-details/index?detail=' + JSON.stringify(detail),
      })
    }
  

    

  },
  onChange(e){
    let name = e && e.detail.name||this.data.active
    this.setData({
      active: name
    })
    this.getList(true)

  },
  getList(isRefresh = false){
    if (isRefresh) {
      // 刷新时候 页码重置
      this.setData({
        pageNumber: 1,
        miniNoticesList:[]
      });
    }
    let that = this;
   let statue = that.data.active=='2'?'':that.data.active
    wx.showLoading({title: '加载中...'});
    homeInform.$getInformList({statue,pageNumber:this.data.pageNumber}).then(res => {
      wx.hideLoading();
      if (res.code === 1) {
        if (res.result.miniNotices.length > 0) {
          let miniNoticesList = that.data.miniNoticesList.concat(res.result.miniNotices)
          that.setData({
            miniNoticesList,
            totalPages:res.result.pageTotal,
            noReadCount: res.result.noReadCount
          });
        } else {
          that.setData({
            miniNoticesList: []
          });
        }
      }
    })
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