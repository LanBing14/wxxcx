import Conf from "../../../config/conf";
import QRCode from "../../../utils/QrCode";

const app = getApp();
//状态
var status = "";
var str = "";
//使用信息显示
var syshow = true;
//使用信息
var syxx = "再次兑换";
//商品状态
var spStatus = "";
//使用时间状态，true-在使用期内，false-过期
var sysjzt = true;
//跳转详情状态
var tzxq = true;
Page({

  data: {
    id:'',
    status:'',
    syShow:false,
    syxx:'',
    ewm:false,
    tzxq:true,
    object:{},
    baseUrl:Conf.imagesUrl,
    showQRCode:true,
    CustomBar: app.globalData.CustomBar,
  },
  async onLoad(option){
    this.setData({
      id: option.id
    });
    wx.showToast({
      title: '加载中...',
      icon:"none",
      duration: 1000
    });
    let that = this;
    syxx = "再次兑换";
    sysjzt = true;
    syshow = true;
    tzxq = true;
    /*RequestApi.$consumerGetDHXQ({"id":option.id}).then(res => {
      if (res) {
        console.log(res);
        status = res.result[0].STATUS;
        if (status == '0'){
          str = "待使用";
          syxx = "立即使用";
        }else if (status == '1') {
          str = "已使用";
        }else if (status == '2') {
          str = "机构下架";
        } else {
          str = "超时失效";
        }
        //判断商品是否下架
        spStatus = res.result[0].SPSTATUS;
        if (spStatus == '1' && status != '0'){
          syshow = false;
          tzxq = false;
        }
        var fwStatus = res.result[0].FWSTATUS;
        var jgStatus = res.result[0].JGSTATUS;
        if (jgStatus != '1' || fwStatus != '1') {
          tzxq = false;
        }
        var syksr = Date.parse(res.result[0].SYKSR);
        var syjzr = Date.parse(res.result[0].SYJZR);
        if (syksr > Date.parse(utils.formatTime(new Date(),'YY-MM-DD')) || syjzr < Date.parse(utils.formatTime(new Date(),'YY-MM-DD'))) {
          sysjzt = false;
        }
        if (res.result[0].FILE_PATH) {
          res.result[0].FILE_PATH = Conf.httpUrl.viewFile + "?path=" + res.result[0].FILE_PATH;
        }
        // 请求成功
        that.setData({
          status:str,
          syShow:syshow,
          syxx:syxx,
          tzxq:tzxq,
          object:res.result[0]
        });

        // 生成二维码
        that.createQrcode();
      }
    });*/
  },
  // 生成二维码
  createQrcode() {
  },
  handelUse(e){
    if (status == '0') {
      if (sysjzt){
        this.setData({
          ewm:true
        })
      } else {
        wx.showToast({
          title: '当前不可使用',
          icon:"none",
          duration: 2000
        });
      }
    }else {
      toGoodDetail(e.currentTarget.dataset.id);
    }
  },
  toGD(e){
    toGoodDetail(e.currentTarget.dataset.id);
  },

  methods: {}
});

/**
 * 跳转商品详情页面
 * @param id
 */
function toGoodDetail(id) {
  wx.navigateTo({
    url: '/pages/user-goods/good-detail/index?spxxId='+id,
    success: function(res){},
    fail: function() {},
    complete: function() {}
  });
}
