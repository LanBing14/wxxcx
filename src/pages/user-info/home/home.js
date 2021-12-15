import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";
import RequestApi from "../../../api/requestApi";
import StorageUtils from "../../../utils/storageUtils";
import baseUrl from "../../../config/conf";
import Conf from "../../../config/conf.js";
import {UserInfo} from "../../../entity/UserInfo";
import UserCenterApi from "../../../api/userCenterApi";
const app = getApp();
var checked = false;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    showDash: {
        type: Boolean,
        default: ''
    },
    showNav: {
        type: Boolean,
        default: ''
    }
  },

  data: {
    showModal:false,
    checkbox:false,
    CustomBar: app.globalData.CustomBar,
    tabBar: "env(safe-area-inset-bottom) / 2",
    appImgUrl:getApp().globalData.appUrl,
    usersList: [
      {
        id: 10,
        title: "我的通讯录",
        url: "user-index/address-list/index",
        imgIcon: getApp().globalData.appUrl+"/images/user/txl@2x.png"
      },
      {
        id: 1,
        title: "访客预约记录",
        url: "user-info/visitorRecord/visitorRecord",
        imgIcon: getApp().globalData.appUrl+"/images/user/fkyyjl@2x.png"
      },
      {
        id: 11,
        title: "物业报修记录",
        url: "user-index/propertyDecoration/propertyDecoration",
        imgIcon: getApp().globalData.appUrl+"/images/user/wybxjl@2x.png"
      },
      {
        id: 2,
        title: "会议室预定记录",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/hysydjl@2x.png"
      }, {
        id: 3,
        title: "一卡通充值记录",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/yktczjl@2x.png"
       
      },{
        id: 4,
        title: "停车缴费记录",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/tcjfjl@2x.png"
      },{
        id: 5,
        title: "物业缴费记录",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/wyjfjl@2x.png"
        
      },{
        id: 6,
        title: "我的活动",
        url: "user-info/activityList/activityList",
        imgIcon: getApp().globalData.appUrl+"/images/user/wdhd@2x.png"
      },{
        id: 7,
        title: "我的问卷",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/wdwj@2x.png"
      },{
        id: 8,
        title: "企业认证",
        url: "user-info/qyrz/qyrz",
        imgIcon: getApp().globalData.appUrl+"/images/user/qyrz@2x.png",
        adminStatus: "1"
      },{
        id: 9,
        title: "我的反馈",
        url: "user-info/identificate/identificate",
        imgIcon: getApp().globalData.appUrl+"/images/user/wdfk@2x.png"
      }
    ],
    userInfo: {},
    baseImgUrl:Conf.imagesUrl
  },

  attached: function(){

    /**获取用户信息更新缓存 */
    UserCenterApi.$isLogin().then(res => {
      
      if (res.code === 1) {
        // 更新登录信息
        let userInfo = new UserInfo();
        userInfo = {...userInfo, ...res.result};
        StorageUtils.set(StorageUtils.key.userInfo, userInfo);
        this.setData({
          userInfo:  StorageUtils.get(StorageUtils.key.userInfo)
        })
      } else {
        // 未登录
        StorageUtils.clearAll();
      }
    });

    /**更新结束 */
  


    this.data.usersList.forEach((v,index) =>{
      if(v.hasOwnProperty("adminStatus") && v.adminStatus !== this.data.userInfo.adminStatus){
            this.data.usersList.splice(index,1);
            this.setData({
              usersList: this.data.usersList
            })
      }
    });
   
   },
   pageLifetimes: {
      show(){
        this.setData({
          userInfo:  StorageUtils.get(StorageUtils.key.userInfo)
        })
       
      }
   },
  methods: {
    linkToUserInfo(){
      wx.navigateTo({
        url: "/pages/user-info/user-details/index"
      })
    },
    //获取个人信息

    handleClickBindAccount(){
      //绑定企业信息
      if( this.data.userInfo.isAudit && this.data.userInfo.isAudit != 3){
        wx.navigateTo({
          url: "/pages/user-info/bindCompany/index"
        })
      }else{
        wx.navigateTo({
          url: "/pages/user-info/companyInfo/index"
        })
      }
    },
  
  //  切换选中
    handelCheck(e){
      this.setData({
        checkbox:!this.data.checkbox
      });
      checked = this.data.checkbox;
    },
    // 打开弹框
    handelChangea(){
      this.setData({
        showModal:true
      })
    },
    // 确认按钮
    hideTrue(){
      this.setData({
        showModal:false
      });
      if (checked){
        wx.showToast({
          title: '加载中...',
          icon:"none",
          duration: 1000
        });
        RequestApi.$consumerSetMRSY({userPage:'1'}).then(res => {
          if (res){
            if (!res.result){
              wx.showToast({
                title: '未开通服务端，不可跳转',
                icon: "none",
                duration: 1000
              });
              return;
            }
          }
        })
      }
      StorageUtils.set(StorageUtils.key.userPage, '1');
      wx.reLaunch({
        url: '/pages/index/index?cur=one',
      });
    },
    // 关闭弹框
    hideFalse(){
      this.setData({
        showModal:false
      })
    },
    openPage(e){
      wx.navigateTo({
        url: `/pages/${e.currentTarget.dataset.url}`,
        success: function(res){},
        fail: function() {},
        complete: function() {}
      });
    },
    toOtherApplets(){
      console.log(111);
     let encryptedData = StorageUtils.get('encryptedData');
     let iv = StorageUtils.get('iv');
      wx.navigateToMiniProgram({
        appId: 'wxd6f9cd25aaad5ce6',
        // appId: 'wxc7968ba3558d132c',
        path: 'pages/login/people/login?encryptedData='+encryptedData+'&iv='+iv,
        // extraData:{
        //   encryptedData: StorageUtils.get('encryptedData'),
        //   iv: StorageUtils.get('iv')
        // },
        // envVersion :"develop",
        // envVersion :"trial",
        envVersion :"release",
        success(res) {
          // 打开成功
          console.log(res);
        }
      })
    }
  }
})
