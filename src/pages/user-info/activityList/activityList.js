// pages/user-info/activityDetails/activityDetails.js
import parkApi from "../../../api/parkApi"
import baseUrl from "../../../config/conf"
import StorageUtils from "../../../utils/storageUtils";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
     status: 1,
     isRefresh: false,
     nodata:false,
     params: {
      start: 1,
      size: 10
    },
    noImg:  {url: baseUrl.baseUrl+'app/mini/images/serive/ew/activity/nothing.png'},
    totalRecords:0,
    activitiesList: [],
    appImgUrl:getApp().globalData.appUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  linkToDetail(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activitiesDetail/activitiesDetail?id=${id}&ismy=true`
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
    this.getActivitiesList();
  },
  getActivitiesList(isRefresh = false){
    let userId = StorageUtils.get(StorageUtils.key.userInfo).userId;
    let params = {
       ...{userId},
       ...this.data.params
    };
    wx.showLoading({
      title: '加载中',
    });
    parkApi.$getActivitiesList(params).then(res =>{
      wx.hideLoading();
       if(res.code === 1){
         const data = res.result.list;
         if(!data.length){
          this.setData({
            nodata: true
          })
          wx.showToast({
            title: "暂无活动",
            icon:"none",
            duration: 2000
          });
        }else {
          this.setData({
            nodata: false
          })
        }
         data.forEach(v =>{
            v.ACTIVITY_LABEL_LABEL= [];
            v.filePath = "";
            v.ACTIVITY_LABEL_LABEL = v.LABEL &&  v.LABEL.split(",").slice(0,5);  
            if(v.cover.length){
              v.filePath = `${baseUrl.httpUrl.viewFile}?path=${v.cover[0].filePath}`;
            }
           });
            this.setData({
              activitiesList: isRefresh? [...this.data.activitiesList,...data] : data,
              totalRecords: res.result.totalRecords
            })
       }else{
        wx.showToast({
          title: res.message,
          icon:"none",
          duration: 1000
        });
       }
    }).catch(err =>{})
  },
  onRefresh(){
     this.setData({
      isRefresh: false
    });
    if(this.data.totalRecords === this.data.activitiesList.length){
      wx.showToast({
        title: "没有更多数据",
        icon:"none",
        duration: 1000
      }); 
       return
    }
    this.setData({
      ["params.start"]:  this.data.params.start++
    })
    this.getActivitiesList(true);
  },
  toReport(){
    wx.navigateTo({    
      url:"/pages/user-index/activityList-search/index"
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
