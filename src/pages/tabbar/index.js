import Utils from '../../utils/utils';
import UserCenterApi from "../../api/userCenterApi";
import {UserInfo} from "../../entity/UserInfo";
import StorageUtils from "../../utils/storageUtils";
Page({
  data: {
    PageCur: 'one',
    homePage: '',
    appImgUrl:getApp().globalData.appUrl,
    isLoginShow:false,
    avatarUrl:''
  
  },
  onShow() {
  },
  // 跳转到二维码页面
  goOrcode(){
    // 判断用户是否是否登录
    // if ('one' != e.currentTarget.dataset.cur) {
    //   if (!Utils.isLogin()) {
    //     wx.navigateTo({
    //       url: '/pages/login/login'
    //     });
    //     return;
    //   }
    // }
    wx.navigateTo({
      url: '/pages/user-index/home-ewm/home-ewm',
    })
  },
  async NavChange(e) {
  // 判断用户是否是否登录
  // if ('one' != e.currentTarget.dataset.cur) {
  //   if (!Utils.isLogin()) {
  //     wx.navigateTo({
  //       url: '/pages/login/login'
  //     });
  //     return;
  //   }
  // }
  UserCenterApi.$isLogin().then(res => {
    if(res.code!=1){
      wx.reLaunch({
        url: '/pages/tabbar/index'
      })
      return
    }
  })


  this.setData({
    PageCur: e.currentTarget.dataset.cur
  })
  },
  wxLogin: function () {
    let that = this;

    wx.login({
      success: function (e) {
        // 查看是否授权
        wx.getUserInfo({
          success: function(res) {
           console.log('获取getUserInfo',res)
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
        // that.setAvatatUrl()
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
  },
  setAvatatUrl(){
    console.log('保存头像',this.data.avatarUrl)
    UserCenterApi.$saveHead(this.data.avatarUrl).then(res => {
      console.log(res)
    })
  },
/**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    
    if (options.cur) {
      this.setData({
        PageCur: options.cur
      })
    }
    try{
      if(options.noLogin=='true'){
      
        this.wxLogin()
        this.setData({
          isLoginShow:true
        })
      }else{
        UserCenterApi.$isLogin().then(res => {
          if(res.code!=1){
          
            this.wxLogin()
            this.setData({
              isLoginShow:true
            })
          }else{
            this.setData({
              isLoginShow:false
            })
          }
        })
      }

    }catch(err){
      console.log(err,'错误')
    }
  
    
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }


})
