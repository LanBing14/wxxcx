// pages/user-index/handle-address/index.js
import AddressList from '../../../api/user-index/address-list';
import StorageUtils from "../../../utils/storageUtils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    userName: '',
    phone: '',
    data: {},
    department: null,
    picker: [],
    departmentUser: '',
    lock: false // 防止页面的按钮重复点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    let data = JSON.parse(options.data)
    let title = data ? '审核' : '邀请'
    _this.setData({
      title,
      data
    })
    console.log(data)
    data && _this.setData({
      userName: data.userName,
      phone: data.mobile,
      departmentUser: data.departmentUser
    })
    _this.getDepartmentList()

  },
  // 选择
  PickerChange(e) {
    this.setData({
      department: e.detail.value
    })
  },
  getDepartmentList() {
    wx.showLoading()
    let data = StorageUtils.get(StorageUtils.key.userInfo);

    AddressList.$getDepartment({
      companyId: data.enterpriseId
    }).then(res => {
      wx.hideLoading()
      this.setData({
        picker: res
      })
      console.log(res)
    })
  },
  //  通过驳回
  changeAccountStatue(e) {
    let statue = e.currentTarget.dataset.type
    let departmentId =  this.data.picker.length &&this.data.department ? this.data.picker[this.data.department].id : ''
    // if (!departmentId) {
    //   wx.showToast({
    //     title: '请确认部门',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }
    AddressList.$changeAccountStatue({
      id: this.data.data.id,
      statue
      // ,departmentId
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '操作成功',
          duration: 3000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 3000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  //  校验手机号
  checkPhone(e) {
    console.log(e)
    e && this.setData({
      phone: e.detail
    })
    
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
  // 显示选择器
  showPicker() {
    this.setData({
      showPicker: !this.data.showPicker
    })
  },
  changeName(e) {
    this.setData({
      userName: e.detail
    })
  },
  clearName() {
    this.setData({
      userName: ''
    })
  },
  //  发送邀请码
  sendMessage() {
    // var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; //11位手机号码正则

    if (!this.data.userName) {
      wx.showToast({
        title: '姓名不能为空',
        duration: 3000
      })
      return false;
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    if (!reg_tel.test(this.data.phone)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
        duration: 3000
      })
      return false
    }

    this.checkPhone()
    wx.showLoading({
      title: '加载中...',
    })
   
    let department =this.data.departmen ?this.data.picker[this.data.department].id:''
    let that = this;
    let {lock} = that.data;
    if(!lock){
      that.setData({lock:true});
      AddressList.$saveUser({
        userName: this.data.userName,
        phone: this.data.phone,
        department
      }).then(res => {
        
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: '邀请码发送成功',
            duration: 3000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 3000)

        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 3000
          })
          setTimeout(()=>{
            that.setData({lock:false});
          },1000)
        }
      })
    }
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
