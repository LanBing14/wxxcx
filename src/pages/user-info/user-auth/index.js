import RequestApi from "../../../api/requestApi";
import Conf from "../../../config/conf";

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
    imagesUrl: Conf.imagesUrl,
    list: {}
  },
  attached() {
    this.getSQGL();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSQGL() {
      wx.showLoading({
        title: '加载中...'
      });
      RequestApi.$consumerGetSQGL().then(res => {
        wx.hideLoading();
        if (res) {
          // 请求成功
          this.setData({
            list: res.result
          });
        }
      });
    },
    delete(e) {
      wx.showToast({
        title: '加载中...',
        icon: "none",
        duration: 1000
      });
      var that = this;
      RequestApi.$consumerDelSQ({"id": e.currentTarget.dataset.id}).then(res => {
        console.log(res);
        if (res) {
          // 请求成功
          wx.showToast({
            title: res.result,
            icon: "none",
            duration: 2000,
            success: function () {
              that.getSQGL();
            }
          });
        }
      });
    }
  }
})
