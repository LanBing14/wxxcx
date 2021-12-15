import RequestApi from "../../../api/requestApi";
import StorageUtils from "../../../utils/storageUtils";
import baseUrl from "../../../config/conf";
import userCenterApi from "../../../api/userCenterApi.js";
import repeairApi from '../../../api/service/propertyRepair.js';
import WxValidate from '../../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHasCode: false,
    isYao: '0',
    company2: {
      companyYao: "",
      userName: "",
      departmentId: "",
      isYao: "0",
      parkId: "",
      companyId: ""
    },

    defaultIndex: null,
    defaultDepartmentIndex: null,
    index: null,
    companyList: [],
    parkList: [],
    departmentList: [],
    user: {},
    getParkValue: '',
    /**公司 */
    company: '',
    lock: false // 防止页面的按钮重复点击
  },
  onChange(event) {
    this.setData({
      ["company2.isYao"]: event.detail
    });
    if (event.detail === '0') {
      this.setData({
        isHasCode: false
      });
    } else {
      this.setData({
        isHasCode: true
      });
    }
  },
  onInputChange(event) {
    this.setData({
      ["company2.userName"]: event.detail
    })
  },
  onYanChange(event) {
    this.setData({
      ["company2.companyYao"]: event.detail
    })
  },
  //部门名称
  onInputDepartmentChange(event) {
    this.setData({
      ["company2.departmentId"]: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**获取当前园区信息 */
    this.getCurrentPark();
    this.initValidate() //验证规则函数
    this.initValidate1()
    this.setData({
      user: StorageUtils.get(StorageUtils.key.userInfo)
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
    this.getPark();
    this.getCompany();

    // this.getDepartment();
  },
  companyChange(event) {
    let index = event.detail.value;
    this.setData({
      ["company2.companyId"]: this.data.companyList[index].ID,
      defaultIndex: index
    })
  },
  parkChange(event) {
    let index = event.detail.value;
    this.setData({
      ["company2.parkId"]: this.data.parkList[index].ID,
      index: index
    })
  },
  departmentChange(event) {
    let index = event.detail.value;
    this.setData({
      ["company2.departmentId"]: this.data.departmentList[index].id,
      defaultDepartmentIndex: index
    })
  },
  //parkList
  getPark() {
    console.log('')
    RequestApi.$getParkUserList().then(res => {
      this.setData({
        parkList: res
      })
    }).catch(err => {})
  },
  //companyList
  getCompany() {
    RequestApi.$getCompany().then(res => {
      this.setData({
        companyList: res
      })

    }).catch(err => {})
  },
  //  getDepartment(){
  //   RequestApi.$getDepartment().then(res =>{
  //     this.setData({
  //       departmentList: res          
  //     })

  //   }).catch(err =>{})
  //  },

  /** 显示园区页面----------------------------------------选择园区修改*/
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  showParkChoose() {
    let parkId = this.data.getParkValue.ID ? this.data.getParkValue.ID : ''
    let data = {
      type: true,
      parkId
    }
    console.log('跳转----------')
    wx.navigateTo({
      url: '/pages/IndexPages/indexPages?data=' + JSON.stringify(data)
    })

  },
  //获取当前园区
  getCurrentPark() {
    repeairApi.$getParkUser().then(res => {

      if (res.code == 1) {
        if (res.result.id) {
          let obj = {
            ID: res.result.id,
            label: res.result.buildName
          }
          this.setData({
            getParkValue: obj
          })
        }
      }

    })
  },

  /**到访公司 */
  showCompanyChoose() {
    if (!this.data.getParkValue) {
      this.showModal({
        msg: "必须先选择所属园区"
      })
      return false
    }

    let companyId = this.data.company.ID ? this.data.company.ID : '';
    let parkId = this.data.getParkValue.ID ? this.data.getParkValue.ID : '';

    console.log('跳转222----------')
    wx.navigateTo({
      url: "/pages/companyChoosePage/companyChoosePage?companyId=" + companyId + "&parkId=" + parkId
    });

  },

  //验证函数
  initValidate() {
    const rules = {
      companyId: {
        required: true
      },
      userName: {
        required: true
      },
      departmentId: {
        required: true
      }
    }
    const messages = {
      companyId: {
        required: '企业名称必填'
      },
      userName: {
        required: '姓名必填'
      },
      departmentId: {
        required: '所在部门必填'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  initValidate1() {
    const rules = {
      // companyId: {
      //   required: '企业名称必填'
      // },
      companyYao: {
        required: true
      }
    }
    const messages = {
      // companyId: {
      //   required: '企业名称必填'
      // },
      companyYao: {
        required: '邀请码必填'
      }
    }
    this.WxValidate1 = new WxValidate(rules, messages)
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

  },
  // 绑定所在部门的数据
  onInputDepartmentChange(e) {
    this.setData({
      ["company2.departmentId"]: e.detail
    })
  },
  getUserAvatar() {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: '是否同意授权微信头像？',
        success(res) {
          //如果用户点击了确定按钮
          if (res.confirm) {
            wx.getUserProfile({
              desc: '获取你的昵称、头像、地区及性别',
              success: res => {

                userCenterApi.$saveHead(res.userInfo.avatarUrl).then(res => {
                  console.log('保存头像接口')
                })
                resolve()
              },
              fail: res => {
                console.log('授权用户头像失败');
                console.log(res)
                resolve()
              }
            });
          } else if (res.cancel) {
            resolve()
            //  取消
            console.log('取消授权用户头像')
          }
        }
      });
    })

  },
  async handleClickConfrim() {
    let obj = "";


    /**没有邀请码 */
    if (this.data.company2.isYao == "0") {

      obj = {
        parkId: this.data.getParkValue.ID,
        companyId: this.data.company.ID,
        isYao: this.data.company2.isYao,
        userName: this.data.company2.userName,
        departmentId: this.data.company2.departmentId,
      }
      if (!this.WxValidate.checkForm(obj)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }
    } else {
      /**有邀请码 */
      obj = {
        parkId: this.data.getParkValue.ID,
        companyId: this.data.company.ID,
        isYao: this.data.company2.isYao,
        companyYao: this.data.company2.companyYao
      }

      if (!this.WxValidate1.checkForm(obj)) {
        const error = this.WxValidate1.errorList[0]
        this.showModal(error)
        return false
      }
    }



    // if(!this.data.company2.companyId){
    //   wx.showToast({
    //     title: "企业名称不能为空",
    //     icon:"none",
    //     duration: 1000
    //   });
    //   return
    // }
    // if(this.data.company2.isYao === "0"){
    // if(!this.data.company2.userName){
    //   wx.showToast({
    //     title: '姓名不能为空',
    //     icon:"none",
    //     duration: 1000
    //   });
    //   return
    // };
    //   if(!this.data.company2.departmentId){
    //     wx.showToast({
    //       title: "部门名称不能为空",
    //       icon:"none",
    //       duration: 1000
    //     });
    //     return
    //   }
    // }
    // if(this.data.company2.departmentId && this.data.company2.departmentId.length>30){
    //   wx.showToast({
    //     title: "所在部门长度不能超过30个字符",
    //     icon:"none",
    //     duration: 1000
    //   });
    //   return
    // }
    // 先获取头像再继续操作
    if(!this.data.user.avatar){
      let a = await this.getUserAvatar()
    }

    let that = this;
    let {lock} = that.data;
    if(!lock){
      that.setData({lock:true});
      RequestApi.$saveAccount(obj).then(res => {
        if (res.code === 1) {
          wx.showToast({
            title: "提交成功",
            icon: "success",
            duration: 1000
          });
          RequestApi.$getUserInfo().then(res => {
            this.setData({
              user: res.result
            });
            StorageUtils.set(StorageUtils.key.userInfo, res.result);
            setTimeout(() => {
              // wx.navigateBack({
              //   delta: 1
              // })
              // wx.navigateTo({
              //   url: "/pages/user-info/home/home"
              // })
              wx.navigateTo({
                url: "/pages/tabbar/index?cur=four"
              })
            }, 500);
          })

        } else {
          wx.showToast({
            title: res.message,
            icon: "none",
            duration: 1000
          });
          setTimeout(()=>{
            that.setData({lock:false});
          },1000)
        }
      }).catch(err => {
        setTimeout(()=>{
          that.setData({lock:false});
        },1000)
        console.log(err)
      })
    }




  },
})
