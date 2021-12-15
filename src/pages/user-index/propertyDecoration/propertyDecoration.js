import Conf from "../../../config/conf.js";
import Property from "../../../api/user-index/property.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    baseUrl: Conf.baseUrl,
    isLoading:false,
    status:'',
    triggered: false,
    list:[],
    active:'',
    appImgUrl: getApp().globalData.appUrl
  },
  onShow: function () {
    this.getDataList()
  },
  onChange(event) {
    let { name } = event.detail;
    this.setData({
      status: name
    });
    this.getDataList(true);
  },
  getDataList() {
    this.setData({
      isLoading:true
    })
    let that = this;
    wx.showLoading({title: '加载中...'});
    Property.$getPropertyList({
      status: this.data.status,
    }).then(function (res) {
      if (res.code === 1) {
        that.setData({
          list:  res.result
        });
      }
      wx.hideLoading();
      that.setData({
        isLoading:false
      })
    })
  },
  toDetail(e){
    var STATE = e.currentTarget.dataset.status
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:  "/pages/user-index/propertyDetail/propertyDetail?id="+id+'&STATE='+ STATE
    });
  },
})
