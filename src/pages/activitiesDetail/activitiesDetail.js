// pages/activitiesDetail/activitiesDetail.js
import ParkApi from "../../api/parkApi";
import Conf from "../../config/conf";
import Utils from "../../utils/utils";
import StorageUtils from '../../utils/storageUtils';
import UserCenterApi from "../../api/userCenterApi.js";
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl: getApp().globalData.appUrl,
    viewImgUrl: getApp().globalData.viewImgUrl,
    ID: '',
    host: Conf.baseUrl,
    isShowBm_btn: true,
    isBmText:'活动报名',
    quxiaoText:'取消报名',
    modelForm: {},
    labelArr: [],
    extendStrBtn: false,
    showMore:false,
    extendStr: true,
    resultHtml:'',
    isquxiao:false,
    isShowBm:true,
    quxiao:true,
    reportShow:false,
    overlay:true,
    duration:300,
    form:{
      name:'',  //访客姓名
      phone:'',// 联系方式
      company:'', // 所在企业
      dept:'' // 所在部门
    },
  },

 
  changeName(event){
    this.setData({
      ['form.name']: event.detail.value,
    })
  },

  changePhone(event){
    this.setData({
      ['form.phone']: event.detail.value,
    })
  },

  changeCompany(event){
    this.setData({
      ['form.company']: event.detail.value,
    })
  },

  changeDepart(event){
    this.setData({
      ['form.dept']: event.detail.value,
    })
  },

  initValidate() {
    const rules = {
      name:{
        required:true,
        maxlength:15
      },
      phone:{
        required:true,
        mobile:true
      },
    }
    const messages = {
      name:{
        required:'姓名必填',
        maxlength:'访客姓名最多15字'
      },
      phone:{
        required:'联系方式必填',
        mobile:'手机号码不正确'
      },
      
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  onClickOverlay () {
    this.setData({ reportShow: false });
    this.setData({
      form:{
        name:'',  
        phone:'',
        company:'', 
        dept:'' 
      },
    })
  },

  formSubmits(e){
    let obj={
        ...e.detail.value,
    }
    if (!this.WxValidate.checkForm(obj)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let id = this.data.modelForm.ID;
    var that = this;
    ParkApi.$signUp(id).then(res => {
      if (res.code == 1) {
        // wx.showToast({
        //   title: '活动报名成功',
        //   duration: 3000
        // })
        that.isNeedPopName(that.data.form);
        that.setData({
          isShowBm_btn: false,
          reportShow: false ,
          isBmText:'已报名'
        })

      } else {
        wx.showToast({
          title: res.message,
          icon: "none",
          duration: 3000
        })
        that.setData({
          isShowBm_btn: false,
          reportShow: false 
        })
      }
      
    })
  },
  /**活动报名 */
  bm_btn() {
    this.setData({
      reportShow:true
    })
    let userInfo = StorageUtils.get(StorageUtils.key.userInfo);
    this.setData({
      form:{
        name:userInfo.userName || '',  
        phone:userInfo.mobile || '',
        company: userInfo.isAudit == '1' && userInfo.companyName ? userInfo.companyName : '', 
        dept:userInfo.deptName || ''
      },
    })
  },

  /**取消报名 */
  quxiao_btn(){
    var that = this
    let id = this.data.modelForm.ID;
    ParkApi.$quXiaoSignUp(id).then(res => {
      wx.showToast({
        title: res.result,
        duration: 1000
      })
      if (res.code == 1) {

          this.setData({
            quxiaoText:'已取消'
          })

          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            });
          },1500)
      
      }

      this.setData({
        quxiao:false
      })
    })
  },
  tapViewExtendComment() {
    this.setData({
      extendStrBtn: !this.data.extendStrBtn
    })
  },
  //  下载图片
  downloadImg(e) {
    var that = this
    wx.showLoading({
      title: '下载中...'
    })
    let {
      url
    } = e.currentTarget.dataset
    let isImg = url.substring(url.lastIndexOf(".") + 1) == 'png' || url.substring(url.lastIndexOf(".") + 1) == 'jpg' || url.substring(url.lastIndexOf(".") + 1) == 'jpeg'
    let fileType = url.substring(url.lastIndexOf(".") + 1)
    wx.downloadFile({
      url: this.data.viewImgUrl + url, //图片的地址
      header: {
        'content-type': 'application/' + fileType
      },
      filePath: wx.env.USER_DATA_PATH + '/file.' + fileType,
      success: function (res) {
        var tempFilePath = res.tempFilePath //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址

        if (isImg) {
          wx.saveImageToPhotosAlbum({
            filePath: res.filePath, //设置下载图片的地址

            success: function () {
              wx.showToast({
                title: '图片保存成功',
                duration: 2000
              })

            },
            fail(err){
  　　　　　　　　if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
  　　　　　　　　　　wx.showModal({
  　　　　　　　　　　　　title: '提示',
  　　　　　　　　　　　　content: '需要您授权保存相册',
  　　　　　　　　　　　　showCancel: false,
  　　　　　　　　　　　　success: modalSuccess => {
  　　　　　　　　　　　　　　wx.openSetting({
  　　　　　　　　　　　　　　　　success(settingdata) {
  　　　　　　　　　　　　　　　　　　if (settingdata.authSetting['scope.writePhotosAlbum']) {
  　　　　　　　　　　　　　　　　　　　　console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
  　　　　　　　　　　　　　　　　　　}else {
  　　　　　　　　　　　　　　　　　　　　console.log('获取权限失败，给出不给权限就无法正常使用的提示')
  　　　　　　　　　　　　　　　　　　}
  　　　　　　　　　　　　　　　　}
  　　　　　　　　　　　　　　})
  　　　　　　　　　　　　}
  　　　　　　　　　　})
  　　　　　　　　}else{
                    wx.showToast({
                      title: '保存失败',
                      icon: 'error',
                      duration:  1000
                      })
                    console.log('保存失败：', err)
                }
            },
            complete: function (res) {
              console.log(res)
            }
          })
        } else {
          that.showFile(res.filePath, fileType)
          wx.saveFile({
            tempFilePath: res.filePath,
            success: function () {
              wx.showToast({
                title: '文件保存成功',
                duration: 2000
              })
            }
          })
        }
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  },
  // 打开预览
  showFile(tempFilePath, fileType) {
    wx.openDocument({
      filePath: tempFilePath,
      fileType: fileType,
      complete: function (e) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async init (options) {
    await wx.showLoading()// 显示loading
    await this.getActivitiesDetail(options)  // 请求数据
    await this.getActivitiesContent(options)  // 请求数据
    await wx.hideLoading() // 等待请求数据成功后，隐藏loading
  },

  /**需不需要弹窗出现 */
  isNeedPopName(obj){
    UserCenterApi.$saveName(obj).then(res => {
      wx.showToast({
        title: '活动报名成功',
        duration: 3000
      })
    })
  },

  saveName() {
    wx.showModal({
      title: '提示',
      content: '是否授权获取微信名称？',
      success(res) {
        //如果用户点击了确定按钮
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: res => {

              UserCenterApi.$saveName(res.userInfo.nickName).then(res => {
                wx.showToast({
                  title: '更新成功',
                  duration: 3000
                })
              })
            },
            fail: res => {
              console.log('授权用户头像失败');
              console.log(res)
            }
          });
        } else if (res.cancel) {
          //  取消
          console.log('取消授权微信名称')
        }
      }
    });
  },

  getActivitiesContent(options){
    var that = this
    ParkApi.$getActivitiesContent(options.id).then(res=>{
      that.setData({
        resultHtml: res
      })
    })
  },
  getActivitiesDetail(options){
    let {ismy}=options;
    var that = this
    ParkApi.$getActivitiesDetail(options.id).then(res => {
      console.log(res,'返回值')
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          modelForm: res.result
        })
        if (res.result.LABEL) {
          var arr = res.result.LABEL.split(",");
          that.setData({
            labelArr: arr
          })
        }
        // 判断活动时间
        let showBtn = true;
        // if (res.result.status != '报名进行中') {
        //   console.log(111)
        //   showBtn = false;
        // }


    

        if (res.result.signUpStatus == '1') { // 已报名
          
          showBtn = false;
          this.setData({
            isBmText:'已报名'
          })

          if(ismy){
            this.setData({
              isquxiao:true,
              isShowBm:false
            })
          }
        }
        if (res.result.IS_SIGN != '1') { // 是否开放报名
          showBtn = false;
        }
        if (res.result.SIGN_END_DATE) { // 报名截止时间，时间处理一下，只取年月日
          let signEndDate = Utils.formatTime(res.result.SIGN_END_DATE, 'YY-MM-DD hh-mm');
          let now = Utils.formatTime(new Date(), 'YY-MM-DD hh-mm');
          if (new Date(signEndDate).getTime() < new Date(now).getTime()) {
            showBtn = false;
            this.setData({
              isBmText:'报名已结束',
              isquxiao:false,
              isShowBm:true
            })

          }
        }
    
        if (res.result.IS_SIGN_LIMITED!=='0' && res.result.COUNTS >= res.result.ENROLLMENT_LIMIT) { // 报名人数
          showBtn = false;
          this.setData({
            isBmText:'报名已满',
            isquxiao:false,
            isShowBm:true
          })
        }
        that.setData({
          isShowBm_btn: showBtn
        })
      }
    })
  },
  onLoad: function (options) {
    console.log(options,'0000')
    this.init(options)
    this.initValidate();//验证规则函数
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.updataExtendShow()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.updataExtendShow()
  },
  // 更多
  updataExtendShow() {
    setTimeout(() => {

      var query = wx.createSelectorQuery()
      query
        .select(`#comment-rich-text`)
        .boundingClientRect((rect) => {
          if (rect != null) {
            const height = rect.height
            if (height > 288) { //Line-height 22 * 6 行
              this.data.extendStr = true
              this.data.extendStrBtn = true
              this.setData({
                extendStr: this.data.extendStr,
                extendStrBtn: this.data.extendStrBtn,
                showMore:true
              })
            } else {
              this.setData({
                extendStrBtn: false,
                showMore:false
              })
            }
            // this.printLog({ rect })
          }
        })
        .exec()
    }, 100)

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
