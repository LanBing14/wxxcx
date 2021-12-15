import Conf from "../../../config/conf";
import ParkApi from "../../../api/parkApi";
import Utils from '../../../utils/utils';
import UserCenterApi from "../../../api/userCenterApi";
import {UserInfo} from "../../../entity/UserInfo";
import StorageUtils from "../../../utils/storageUtils";
Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  },
  data: {
    triggered: false,
    isLoading:false,
    imagesUrl: Conf.imagesUrl,
    appImgUrl:Conf.baseUrl + 'app/mini/',
    viewFile: Conf.httpUrl.viewFile,
    hotList:[
      {img: Conf.baseUrl+'/app/mini/images/home/5.png', text:'防疫申报', id: 1, url: '/pages/service/FYdeclaration/FYdeclaration'},
      // {img: Conf.baseUrl+'/app/mini/images/home/2.png', text:'访客预约', id: 2, url: '/pages/service/visitorAppointment/visitorAppointment'},
      {img: Conf.baseUrl+'/app/mini/images/home/3.png', text:'物业报修', id: 3, url: '/pages/service/propertyRepair/propertyRepair'},
      {img: Conf.baseUrl+'/app/mini/images/home/4.png', text:'信息征集', id: 4, url: '/pages/service/SolicitInformation/solicitInformation'},
      // {img: Conf.baseUrl+'/app/mini/images/home/3.png', text:'停车缴费', id: 5, url: '/pages/user-info/identificate/identificate'},
      {img: Conf.baseUrl+'/app/mini/images/home/1.png', text:'一卡通充值', id: 6, url: '/pages/user-info/identificate/identificate'},
      // {img: Conf.baseUrl+'/app/mini/images/home/1.png', text:'物业缴费', id: 7, url: '/pages/user-info/identificate/identificate'},
      {img: Conf.baseUrl+'/app/mini/images/home/2.png', text:'会议室预定', id: 7, url: '/pages/user-info/identificate/identificate'},
      {img: Conf.baseUrl+'/app/mini/images/home/6.png', text:'更多', id: 8, url: '/pages/tabbar/index?cur=three'}
    ],
    cardCur: 0,
    swiperList: [],
    informationList: [],
  },
  lifetimes:{
    attached: async function () {
      // 获取活动列表
      this.getActivitiesList();
      // 获取资讯列表
      this.getInformationList();
    }
  },
  ready: function() {
    // wx.navigateTo({
    //   url: '/pages/user-index/home-inform/index',
    // })
   },
  methods: {
    // 快捷入口跳转
    fastGo: function(e) {
      UserCenterApi.$isLogin().then(res => {
        if(res.code!=1){
          wx.reLaunch({
            url: '/pages/tabbar/index'
          })
          return
        }
      })
      // console.log(e);
      let { url } = e.currentTarget.dataset;
      if (url) {
        wx.navigateTo({
          url: url,
        })
      } else{
        wx.showToast({title: "功能正在开发中...", icon: "none"})
      }
    },

    onLoad: function() {
      wx.navigateTo({
        url: 'pages/user-index/home-inform/index',
      })
    },
    onRefresh() {
      console.info('下拉刷新');
      let that = this;
      setTimeout(() => {
        // 数据成功后，停止下拉刷新
        that.setData({
          triggered: false,
        })
      }, 1000);
    
       // 获取活动列表
       that.getActivitiesList();
       // 获取资讯列表
       that.getInformationList();
    },
    // 分页加载数据
    loadMore: function (e) {
      console.log('la')
      
    },
    
    getActivitiesList() {
      let that = this;
      ParkApi.$getActivitiesList({start: 1, size: 5}).then(res => {
        if (res.code === 1) {
          console.log(res);
          if (res.result.list.length > 0) {
            res.result.list.forEach(function (item) {
              if (item.cover && item.cover.length > 0) {
                item.coverPath = that.data.viewFile + "?path=" + item.cover[0].filePath;
              }
            });
            that.setData({
              swiperList: res.result.list
            });
          } else {
            that.setData({
              swiperList: []
            });
          }
        }
      });
    },
    linkToDetail: function(e) {
      let {id} = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/activitiesDetail/activitiesDetail?id=' + id
      });
    },
    replaceSpecialChar(url) {
      url = url.replace(/&quot;/g, '"');
      url = url.replace(/&ldquo;/g, '"');
      url = url.replace(/&rdquo;/g, '"');
      url = url.replace(/&amp;/g, '&');
      url = url.replace(/&lt;/g, '<');
      url = url.replace(/&gt;/g, '>');
      url = url.replace(/&nbsp;/g, ' ');
      return url;
    },
    getInformationList() {
      let that = this;
      ParkApi.$getInformationList({start: 1, size: 10}).then(res => {
        if (res.code === 1) {
          console.log(res);
          if (res.result.list.length > 0) {
            res.result.list.forEach(function (item) {
              if (item.cover && item.cover.length > 0) {
                item.coverPath = that.data.viewFile + "?path=" + item.cover[0].filePath;
              }
              item.NOTICE_TITLE = that.replaceSpecialChar(item.NOTICE_TITLE)
            });
            that.setData({
              informationList: res.result.list
            });
          } else {
            that.setData({
              informationList: []
            });
          }
        }
      });
    },
    // 去资讯详情页面
    goDetail(e) {
      let {id} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/user-index/information-details/index?id='+id,
      })
    }
  }
})
