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
    szckfh1:  {url:Conf.baseUrl+'/app/mini/images/park/szckfh1.png'},
    szckfh2:  {url:Conf.baseUrl+'/app/mini/images/park/szckfh2.png'},
    steps: [
      {
        text: 2018,
        desc: '1纳入2018年度省级备案众创 空间数位列苏州市第一2.高新区出台《苏州高新区关于进一步推进发展众创空间支持大众创新创业的实施办法》',
      },
      {
        text: 2017,
         desc: '1“医疗器械专业化众创空间”成功入选科技部第二批国际按专业化众创空间示范单位，成为苏州市第一家国家专业化众创空间2. “众创客”、“e帮创”、  “创意云孵化器”被评为苏南国家自主创新示范区优秀众创空间3.市级众创空间绩效考核位列全市第一',
      },
      {
        text: 2016,
        desc: '1.“苏州创客峰会”成功入选江苏省发改委首批大众创也方向创新示范基地2市级众创空间绩效考核成绩并列全市第一名3高新区出台《苏州高新区关于发展新型孵化器支持大众创新创业的办法(试行)的操作细则》 4.“e帮创”成为高新区第一家国家级众创空间',
      },
      {
        text: 2015,
        desc: '1“苏州创客峰汇”成为江苏省首批省级众创集聚区试点单位2.高新区出台《苏州高新区关于发展新型孵化器支持大众创新创业的办法(试行)》 3“苏州创客峰汇”正式启动，首批14家众创空间集中签约入驻',
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
