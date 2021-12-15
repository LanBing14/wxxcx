// pages/user-info/activityDetails/activityDetails.js
import Conf from "../../../config/conf";
import ParkApi from "../../../api/parkApi";
import utils from '../../../utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: Conf.baseUrl,
    appImgUrl:getApp().globalData.appUrl,
    CustomBar: getApp().globalData.CustomBar,
    triggered: false,
    imagesUrl: Conf.imagesUrl,
    viewFile: Conf.httpUrl.viewFile,
    // 当前页
    currentPage: 1,
    // 数据总页数
    totalPages: 0,
    length: 10,
    activityName:'',
    list:[],
    today:'',
    showCalendar:false,
    defaultDate : [new Date().getTime(),new Date().getTime()+24*60*60*1000],
    minDate: new Date(2019, 3, 1).getTime(),
    startDate:'',
    endDate:'',
    notification:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  handleAdd(e) {
    this.setData({
      showCalendar:true
    })
  },
  // 日期选择
  onDisplay() {
    console.log('closeData')

    this.setData({ showCalendar: true });
  },
  closeData() {
    console.log('closeData')
    this.setData({ showCalendar: false });
  },
 
  seleceDate(event){
    if(event.detail[1]){
      const [start, ] = event.detail;
      utils.formatTime(end,'YY-MM-DD');
      this.setData({
        startDate: utils.formatTime(start,'YY-MM-DD'),
        endDate: utils.formatTime(end,'YY-MM-DD'),
      })
    }
  },
  //  点击确定
  confirmDate() {
    // 如果用户没有选择就点击了确定 则默认添加数据
    if(!this.data.setData){
      this.setData({
        startDate: utils.formatTime(this.data.defaultDate[0],'YY-MM-DD'),
        endDate: utils.formatTime(this.data.defaultDate[1],'YY-MM-DD'),
      })
    }
    this.setData({
      showCalendar: false,
    });
    this.getDataList(true)
  },

  // 日期选择结束
  onRefresh() {
    if(this.data.showCalendar){
      return
    }
    let that = this;
    setTimeout(() => {
      // 数据成功后，停止下拉刷新
      that.setData({
        triggered: false,
      })
    }, 1000);
    that.getDataList(true);
  },
  // 日期时间戳 重置
  reset(){
    this.setData({
      startDate:'',
      endDate:'',
      showCalendar:false,
      defaultDate : [new Date().getTime(),new Date().getTime()+24*60*60*1000],
    })
    this.getDataList(true);
  },
 
  // input 发生变化
  onChange(e){
    this.setData({
      activityName:e.detail
    })
    this.getDataList(true);
  },
  // 分页加载数据
  loadMore() {
    if(this.data.showCalendar){
      return
    }
    if (this.data.currentPage >= this.data.totalPages) {
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration: 3000
      })
      return;
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    });
    this.getDataList(false);
  },
  /**
   * 是否刷新
   * @param isRefresh
   */
  getDataList(isRefresh = false) {
    if (isRefresh) {
      // 刷新时候 页码重置
      this.setData({
        currentPage: 1,
        list:[]
      });
    }
    let that = this;
    wx.showLoading({title: '加载中...'});
    ParkApi.$getActivitiesList({
      activityName: this.data.activityName,
      start: this.data.currentPage,
      size: this.data.length,
      startDate:this.data.startDate,
      endDate:this.data.endDate,
    }).then(function (res) {
      wx.hideLoading();
      if (res.code === 1) {
        console.log(res)
        // 请求成功
        res.result.list.forEach(function (item) {
          if (item.cover && item.cover.length > 0) {
            item.coverPath = that.data.viewFile + "?path=" + item.cover[0].filePath;
          }
        });
        that.setData({
          totalPages: res.result.totalPages,
          list: isRefresh ? res.result.list : that.data.list.concat(res.result.list)
        });
      }
    })
  },
  linkToDetail: function(e) {
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/activitiesDetail/activitiesDetail?id=' + id
    });
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
    this.setData({
      today: utils.formatTime(new Date(),'YY-MM-DD')
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
