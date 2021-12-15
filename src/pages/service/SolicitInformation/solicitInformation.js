// pages/service/FYdeclaration/FYdeclaration.js
import Conf from "../../../config/conf";
import ServiceApi from "../../../api/serviceApi";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewFile: Conf.httpUrl.viewFile,
    CustomBar: app.globalData.CustomBar,
    // 当前页
    currentPage: 1,
    // 数据总页数
    totalPages: 0,
    isLoading:false,
    length: 10,
    status:'',
    triggered: false,
    list:[],
    active:'',
  },

  onChange(event) {
    let { name } = event.detail;
      this.setData({
        status: name
      });
      this.getDataList(true);
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
    if (this.data.currentPage >= this.data.totalPages) {
      return;
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    });
    if(!this.data.isLoading){
      this.getDataList(false);
    }

  },
  /**
   * 是否刷新
   * @param isRefresh
   */
  getDataList(isRefresh = false) {
    this.setData({
      isLoading:true
    })
    if (isRefresh) {
      // 刷新时候 页码重置
      this.setData({
        currentPage: 1,
        list:[]
      });
    }
    let that = this;
    wx.showLoading({title: '加载中...'});
    ServiceApi.$getDeclarationList({
      status: this.data.status,
      start: this.data.currentPage,
      size: this.data.length
    }).then(function (res) {


      if (res.code === 1) {

        // 请求成功
        that.setData({
          totalPages: res.result.totalPages,
          list: isRefresh ? res.result.list : that.data.list.concat(res.result.list)
        });
      }
      wx.hideLoading();
      that.setData({
        isLoading:false
      })
    })
  },
  /**去信息征集详情 */
  toDetail(e){
    let id =e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let declarationId = e.currentTarget.dataset.declarationid;
    if(status==1 || status == 5){
      wx.navigateTo({
        url:  "/pages/service/SolicitInformationDetail/SolicitInformationDetail?id="+id + "&declarationId=" + declarationId
      });
    }else{
      wx.navigateTo({
        url:  "/pages/service/SolicitInformationHasDetail/SolicitInformationHasDetail?id="+id + "&declarationId=" + declarationId
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDataList(true);
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
    this.getDataList(true);
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
