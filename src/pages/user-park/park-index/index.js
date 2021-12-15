import Conf from "../../../config/conf";
import ParkApi from "../../../api/parkApi";
const app = getApp();
Component({

  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  },
  properties:{

  },
  data: {
    appImgUrl:getApp().globalData.appUrl,
    CustomBar: app.globalData.CustomBar,
    appImgUrl:getApp().globalData.appUrl,
    viewFile: Conf.httpUrl.viewFile,
    tabList:[
      {img: Conf.baseUrl+'/app/mini/images/park/yqgk.png',text:'园区概况',id:1, url: '/pages/user-park/park-general/index'},
      {img: Conf.baseUrl+'/app/mini/images/park/kjzs.png',text:'空间展示',id:2, url: '/pages/user-park/space-show/index'},
      {img: Conf.baseUrl+'/app/mini/images/park/cxhd.png',text:'创新活动',id:3, url: '/pages/user-index/activityList-search/index'},
      {img: Conf.baseUrl+'/app/mini/images/park/jgzs.png',text:'机构展示',id:4, url: '/pages/user-park/agency-show/index'},
    ],
    parkList:[],
    swiperList: [{
      id: 1,
      type: 'image',
      url:  Conf.baseUrl+'/app/mini/images/park/yqzs.png'
    },{
      id: 2,
      type: 'image',
      url:  Conf.baseUrl+'/app/mini/images/park/p1.png'
    },{
      id: 3,
      type: 'image',
      url:  Conf.baseUrl+'/app/mini/images/park/p2.png'
    },{
      id: 4,
      type: 'image',
      url:  Conf.baseUrl+'/app/mini/images/park/p3.png'
    }],
  },
  lifetimes:{
    attached: async function () {
      // 获取资讯列表
      this.getInformationList();
    }
  },
  onLoad: function (options) {

  },
  methods: {
    // 快捷入口跳转
    fastGo: function(e) {
      let { url } = e.currentTarget.dataset;
      if (url) {
        wx.navigateTo({
          url: url,
        })
      } else{
        wx.showToast({title: "功能正在开发中...", icon: "none"})
      }
    },
    handleGo(e){
      let {id} = e.currentTarget.dataset
        wx.navigateTo({
          url: '/pages/user-index/information-details/index?id='+id,
        })
    },
    getInformationList() {
      let that = this;
      ParkApi.$getInformationList({start: 1, size: 10}).then(res => {
        if (res.code === 1) {
          if (res.result.list.length > 0) {
            res.result.list.forEach(function (item) {
              if (item.cover && item.cover.length > 0) {
                item.coverPath = that.data.viewFile + "?path=" + item.cover[0].filePath;
              }
            });
            that.setData({
              parkList: res.result.list
            });
          } else {
            that.setData({
              parkList: []
            });
          }
        }
      });
    },

  },
  onReachBottom: function () {
    // this.getdata()//获取数据
  },
})
