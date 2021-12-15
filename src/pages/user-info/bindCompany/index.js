import StorageUtils from "../../../utils/storageUtils";
import RequestApi from "../../../api/requestApi";
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {UserInfo} from "../../../entity/UserInfo";
import UserCenterApi from "../../../api/userCenterApi";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    appImgUrl:getApp().globalData.appUrl,
    user: {},
    departmentName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let user =  StorageUtils.get(StorageUtils.key.userInfo)
    // this.setData({
    //   user
    // });
    UserCenterApi.$isLogin().then(res => {
      if (res.code === 1) {
        // 更新登录信息
        let userInfo = new UserInfo();
        userInfo = {...userInfo, ...res.result};
        StorageUtils.set(StorageUtils.key.userInfo, userInfo);
        this.setData({
          user: userInfo
        })
      } else {
        console.info('清空缓存··················')
        // 未登录
        StorageUtils.clearAll();
      }
    });

   
  },
  onShow(){
   
  },
  async getDepartmentName(){
    let res = await RequestApi.$getDepartmentName();
    this.setData({
      departmentName: res.result
    })
  },
  handleConfirm(){
    let that = this
    let user = StorageUtils.get(StorageUtils.key.userInfo);
    const params = {
      statue: 3,
      id: user.userId,
      departmentId: null
    };
    if(user.isAudit ==='1'){
      Dialog.confirm({
        title: '是否解除绑定',
        message: '',
      }).then(() => {
          that.fn(params);
        }).catch(() => {
          // on cancel
        });
    }else{
      that.fn(params);
    }
  },
  fn(params){
    RequestApi.$changeAccountStatue(params).then(res =>{
      if(res.code===1){
        RequestApi.$getUserInfo().then(res =>{
          wx.redirectTo({
            url: "/pages/user-info/companyInfo/index"
          })
          setTimeout(()=> {
            this.setData({
              user: res.result
            });
            StorageUtils.set(StorageUtils.key.userInfo,res.result);
          },500)
       })
      }
   });
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
     this.getDepartmentName();
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
