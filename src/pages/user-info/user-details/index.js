import RequestApi from "../../../api/requestApi";
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import StorageUtils from "../../../utils/storageUtils";
import userCenterApi from "../../../api/userCenterApi.js";
import Conf from "../../../config/conf.js";
Component({
  options: {
    addGlobalClass: false,
  },
  /**
   * 组件的属性列表
   */
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

  /**
   * 组件的初始数据
   */
  data: {
    user:{},
    userInfo: {},
    baseImgUrl:Conf.imagesUrl
  },
  attached(){
    console.log("初始化组件")
    this.setData({
      userInfo:  StorageUtils.get(StorageUtils.key.userInfo)
    })
    this.getGRXX();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 保存头像
    saveAvatar() {
        wx.showModal({
          title: '提示',
          content: '是否授权更新微信头像？',
          success(res) {
            //如果用户点击了确定按钮
            if (res.confirm) {
              wx.getUserProfile({
                desc: '获取你的昵称、头像、地区及性别',
                success: res => {
                  console.log(res)
                  userCenterApi.$saveHead(res.userInfo.avatarUrl).then(res => {
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
              console.log('取消授权用户头像')
            }
          }
        });
    },
    //is logout
    handleLogout(){
      Dialog.alert({
        title: '',
        showConfirmButton: true,
        showCancelButton: true,
        message: '退出登录'
      }).then(() => {
        // on confirm
        wx.navigateTo({
          url: "/pages/tabbar/index"
        })
        StorageUtils.clearAll();
    })
    .catch(() => {
        // on cancel
      });
    },

    getGRXX(){
      this.setData({
        user: StorageUtils.get(StorageUtils.key.userInfo)
      });
      return
      let self = this;
      wx.showToast({
        title: '',
        icon:"none",
        duration: 1000
      });
      RequestApi.$consumerGetUserMessager().then(res => {
        if (res) {
          // 请求成功
          console.log(res)
          console.log(12222222)
          self.setData({
            user:res.result
          });
        }
      });
    }
  }
})
