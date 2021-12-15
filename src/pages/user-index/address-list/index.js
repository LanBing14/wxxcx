// pages/user-index/home-inform/index.js
import AddressList from '../../../api/user-index/address-list';
import StorageUtils from "../../../utils/storageUtils";
import {UserInfo} from "../../../entity/UserInfo";
import UserCenterApi from "../../../api/userCenterApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: getApp().globalData.CustomBar,
    active: '3',
    addressList:[],
    nameOrPhone:'',
    pageNumber:1,
    totalPages:0,
    appImgUrl:getApp().globalData.appUrl,
    viewImgUrl: getApp().globalData.viewImgUrl,
    isAdminStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    UserCenterApi.$isLogin().then(res => {
      if (res.code === 1) {
        // 更新登录信息
        let userInfo = new UserInfo();
        userInfo = {...userInfo, ...res.result};
        StorageUtils.set(StorageUtils.key.userInfo, userInfo);
        this.setData({
          isAdminStatus: (userInfo.adminStatus == 1)
        })
      } else {
        console.info('清空缓存··················')
        // 未登录
        StorageUtils.clearAll();
      }
    });



    // let data = StorageUtils.get(StorageUtils.key.userInfo);
    // this.setData({
    //   isAdminStatus: (data.adminStatus == 1)
    // })
    // console.log(this.data.isAdminStatus)
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
    this.onChange(true)
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
  //  e.currentTarget.dataset.data: 有值 跳转审核页面 否则跳转邀请页面
  handleAdd(e){
    let data = e.currentTarget.dataset.data
    console.log('data',data)
    wx.navigateTo({
      url: '../handle-address/index?data='+JSON.stringify(data),
    })
  },

  onChangeNameOrPhone(e){
    this.setData({
      nameOrPhone: e.detail
    })
    this.getList(true)
  },
  onChange(e){
    let name =( e.detail && e.detail.name)||this.data.active
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
        addressList:[]
      });
    }
    let that = this;
   let statue = that.data.active=='3'?'':that.data.active
    wx.showLoading({title: '加载中...'});
    AddressList.$getAddressBook({statue,nameOrPhone:this.data.nameOrPhone,pageNumber:this.data.pageNumber}).then(res => {
      if (res.code === 1) {
        if (res.result.addressBooks.length > 0) {
          let addressList = that.data.addressList.concat(res.result.addressBooks)
          that.setData({
            addressList,
            totalPages:res.result.totalPages
          });
        } else {
          that.setData({
            addressList: []
          });
        }
      }
      wx.hideLoading();

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
