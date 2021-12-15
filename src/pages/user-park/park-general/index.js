// pages/user-park/park-general/index.js
import Conf from "../../../config/conf";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      {url:Conf.baseUrl+'/app/mini/images/park/gk1.png'},
      {url:Conf.baseUrl+'/app/mini/images/park/p1.png'},
      {url:Conf.baseUrl+'/app/mini/images/park/p2.png'},
      {url:Conf.baseUrl+'/app/mini/images/park/p3.png'}
    ],
    steps: [
      {
        text: 1994,
        desc: '苏州技术创业服务中心成立',
      },
      {
        text: 1996,
         desc: '联合国开发计划署和原国家科委联合考核，确定为全家首批三家“国家企业孵化器”',
      },
      {
        text: 1997,
        desc: '国家教育部、原国家科委、江苏省科委、省人事厅联合组建“中国苏州留学人员创业园”',
      },
      {
        text: 1998,
        desc: '团中央、全国青联授予“中国青年科技创新行动示范基地”。',
      },
      {
        text: 2000,
        desc: '国家科技部、人事部、教育部和外国专家局联合授予“国家级示范园”荣誉称号。',
      },
      {
        text: 2002,
        desc: '中国侨联授予“中国侨联科教兴国示范基地”荣誉称号。',
      },
      {
        text: 2003,
        desc: '中共中央组织部、宣传部、统战部、国务院人事部、教育部、科技部共同授予 “全国留学回国人员先进工作单位”',
      },
      {
        text: 2004,
        desc: '中共江苏省委、省政府授予“江苏省留学回国人员先进工作单位”。',
      },
      {
        text: 2005,
        desc: '1. 国家科技部确认为首批“国家创新基金项目服务结构”;  2. 江苏省文明委评为“省级文明单位”。',
      },
      {
        text: 2006,
        desc: '获得国家科技部“民营科技创新奖、奉献奖”。',
      },
      {
        text: 2007,
        desc: '1. 被中共苏州国家高新技术产业开发区工作委员会、苏州国家高新技术产业开发区管理委员会评为“苏州高新区2006年科技创新工作专利工作先进集体”；2. 被苏州市人民政府评为“苏州市服务业重点集聚地区”',
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
