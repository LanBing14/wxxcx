import ConsumeApi from "../../../api/consumeApi";
import Conf from "../../../config/conf";
import QRCode from '../../../utils/QrCode.js';
import StorageUtils from "../../../utils/storageUtils";
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp();
Page({

  data: {
    fkId: '',
    serviceId: '',
    pageType: '',//0 商品兑换 1 措施优享
    status: '',
    tzxq: true,//跳转详情状态
    object: {},
    baseUrl: Conf.imagesUrl,
    showQRCode: false,
    CustomBar: app.globalData.CustomBar,
  },
  async onLoad(option) {
    this.setData({
      fkId: option.id,
      pageType: option.fwfs
    });
    wx.showToast({
      title: '加载中...',
      icon: "none",
      duration: 1000
    });
    let _this = this;
    ConsumeApi.$getConsumeRecordDetail({"id": option.id}).then(res => {
      console.log(res)
      if (res) {

        // 请求成功
        _this.setData({
          object: res.result
        });

      }
    });
  },
  ly(e) {
    let _this = this;
    // 生成二维码

    // 打开socket连接
    wx.connectSocket({
      url: Conf.httpUrl.consumer.socketUrl + StorageUtils.get(StorageUtils.key.userInfo).id + _this.data.serviceId
    });

    // 接受socket消息
    wx.onSocketMessage(res => {
      try {
        let data = JSON.parse(res.data);
        console.info(data);
        if (data.code == "1") {
          Dialog.alert({
            title: '提示',
            message: '已成功履约，任意点击关闭刷新状态',
          }).then(() => {
          });
        } else {
          Dialog.alert({
            title: '提示',
            message: '履约失败',
          }).then(() => {
          });
        }
      } catch (e) {
      }
    });
  },
  evaluate(e) {
    wx.navigateTo({
      url: '/pages/user-record/evaluate/index?id=' + e.currentTarget.dataset.detailid,
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    });
  },
  getUserInfo(event) {
    console.log(event.detail);
  },
  onClose() {
    this.setData({show: false});
  },
  methods: {},
  onUnload() {
    // 页面销毁关闭socket连接
    wx.closeSocket();
  },
});


