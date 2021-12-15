// pages/service/home/index.js
import Conf from "../../../config/conf";
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    homeData:[
      {
        bigTitle:'企业服务',
        homeSrc:getApp().globalData.appUrl+'images/home/home1.png',
        /** 企业服务*/
        itemContent:[
          {
            src:getApp().globalData.appUrl+'images/home/xxzj.png',
            title:'信息征集',
            url:'/pages/service/SolicitInformation/solicitInformation'
          },
          {
            src:getApp().globalData.appUrl+'images/home/qykc.png',
            title:'企业快查',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/cxhd.png',
            title:'创新活动',
            url:"/pages/user-index/activityList-search/index"
          },
          {
            src:getApp().globalData.appUrl+'images/home/yxb.png',
            title:'英雄榜',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/ysc.png',
            title:'云市场',
            url:'/pages/user-info/identificate/identificate'
          }
        ]
      },
      {
        bigTitle:'园区服务',
        homeSrc:getApp().globalData.appUrl+'images/home/home2.png',
        /** 企业服务*/
        itemContent:[
          {
          
            src:getApp().globalData.appUrl+'images/home/fysb.png',
            title:'防疫申报',
            url:"/pages/service/FYdeclaration/FYdeclaration"
          },
          {
            src:getApp().globalData.appUrl+'images/home/fkyy.png',
            title:'访客预约',
            url:"/pages/service/visitorAppointment/visitorAppointment"
          },
          {
            src:getApp().globalData.appUrl+'images/home/tcjf.png',
            title:'停车缴费',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/yktcz.png',
            title:'一卡通充值',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/wyjf.png',
            title:'物业缴费',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/ydjf.png',
            title:'用电缴费',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/wybx.png',
            title:'物业报修',
            url:"/pages/service/propertyRepair/propertyRepair"
          },
          {
            src:getApp().globalData.appUrl+'images/home/hysyd.png',
            title:'会议室预定',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/zxfw.png',
            title:'装修服务',
            url:'/pages/service/decorationApplication/decorationApplication'
          }
        ]
      },
      {
        bigTitle:'服务机构',
        homeSrc:getApp().globalData.appUrl+'images/home/home3.png',
        /** 企业服务*/
        itemContent:[
          {
            src:getApp().globalData.appUrl+'images/home/zckj.png',
            title:'众创空间',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/fhq.png',
            title:'孵化器',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/cxpt.png',
            title:'创新平台',
            url:'/pages/user-info/identificate/identificate'
          }
        ]
      },
      {
        bigTitle:'问题反馈',
        homeSrc:getApp().globalData.appUrl+'images/home/home4.png',
        /** 企业服务*/
        itemContent:[
          {
            src:getApp().globalData.appUrl+'images/home/wtfk.png',
            title:'问题反馈',
            url:'/pages/user-info/identificate/identificate'
          },
          {
            src:getApp().globalData.appUrl+'images/home/wjdc.png',
            title:'问卷调查',
            url:'/pages/user-info/identificate/identificate'
          }
        ]
      }
    ]
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})
