import StorageUtils from './utils/storageUtils';
import {UserInfo} from "./entity/UserInfo";
import UserCenterApi from "./api/userCenterApi";
import Conf from "./config/conf";

App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    this.getUserInfo();
  },

  getUserInfo: function () {
    UserCenterApi.$isLogin().then(res => {
      console.info(res);
      if (res.code === 1) {
        // 更新登录信息
        let userInfo = new UserInfo();
        console.log(userInfo)
        userInfo = {...userInfo, ...res.result};
        StorageUtils.set(StorageUtils.key.userInfo, userInfo);
      } else {
        console.info('清空缓存··················')
        // 未登录
        StorageUtils.clearAll();
      }
    });
  },

  globalData: {
    appUrl: Conf.baseUrl +'/app/mini/',
    viewImgUrl:Conf.httpUrl.viewFile+'?path='
  }
})
