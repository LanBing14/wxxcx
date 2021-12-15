import UserCenterApi from "../../api/userCenterApi";
import {UserInfo} from "../../entity/UserInfo";
import StorageUtils from "../../utils/storageUtils";
import * as Utils from "../../utils/utils";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    appImgUrl:getApp().globalData.appUrl
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxLogin();
  },

  wxLogin: function () {
    let that = this;

    wx.login({
      success: function (e) {
        // 查看是否授权
        wx.getUserInfo({
          success: function(res) {

            that.setData({
              nickname: res.userInfo.nickName
            })
          }
        })
        console.log(123333)
        UserCenterApi.$wxLogin({'code': e.code}).then(data => {
          console.log(data)
        })
      }
    });
  },
  getPhoneNumber: function (e) {
    let that = this;
    if (Utils.isNull(this.data.nickname)) {
      wx.showToast({
        title: '请先授权',
        icon:"none",
        duration: 2000
      });
      return;
    }
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
      },
      fail: function (res) {
        console.log("登录态过期");
        that.wxLogin();
      }
    })
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      UserCenterApi.$decodeUserInfo(e.detail.encryptedData, e.detail.iv, this.data.nickname).then(data => {
        if (data.code == 1) {
        // 用户信息放入缓存中
        let userInfo = new UserInfo();
        userInfo = {...userInfo, ...data.result};
        StorageUtils.set(StorageUtils.key.userInfo, userInfo);
        wx.reLaunch({
          // 跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
          url: '/pages/tabbar/index'
        })
      } else if (data.code == 402) {
        // 用户不存在需要去注册用户
        console.info('22222');
      }
    })
    }
  }
})
