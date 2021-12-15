import GoodsServiceApi from "../../../api/goodsServiceApi";
import Utils from "../../../utils/utils";
import StorageUtils from "../../../utils/storageUtils";
import Conf from "../../../config/conf";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots:true,
  },
  data: {
    appImgUrl:getApp().globalData.appUrl,
    imagesUrl: Conf.imagesUrl,
    viewFile: '',
    currentXyb: 0,
    consumedXyb: 0,
    userArea: '',
    areaList: [],
    elements: [],
    otherNavList: [],
    dataList:[],
    params: {
      area: '',
      type: '',
      exchange: '0'
    },
    showNavList: false, // 显示头部菜单
    showDash: false, // 显示仪表盘
    showOtherNavList:false, // 显示主页面菜单
    showmain:true, // 不显示个人信用币详情
    gainCoin: 0,// 获取
    consumeCoin:100, // 消耗
    showOptions: false, // 显示options
    isShowOFme: false, // 仅我可见
    showIntegrationRule:false, // 显示积分格则
    xybQuery: {
      status: '',
      date: '',
      next: '0'
    },
    goodList:[],
    rule: '',
    ruleList:[
      {
        text:"全部",
        value:''
      },
      {
        text:"获取",
        value:'0'
      },
      {
        text:"消耗",
        value:'1'
      },

    ],
    integrationRule: {}
  },
  lifetimes: {

    attached: async function () {

      // 获取用户信息
      var userInfo = StorageUtils.get(StorageUtils.key.userInfo);
      if (userInfo) {
        this.setData({
          userArea: userInfo.areaCode
        })
      }

      // 获取信用币
      this.getXybNumber();

      // 获取所属区域
      const area = await GoodsServiceApi.$getDictList('ssqy');
      if (area.code === 1) {
        let arr = new Array();
        area.result.forEach(item => {
          var temp = {text: item.value, value: item.key};
          arr.push(temp);
        });
        this.setData({
          areaList: arr
        });
        if (!this.data.userArea) {
          this.setData({
            userArea: arr[0].value
          });
        }
      }

      // 获取商品类别
      const type = await GoodsServiceApi.$getDictList('xyj_classOfService');
      if (type.code === 1) {
        type.result.forEach(item => {
          item.imageSrc = this.data.imagesUrl + item.key + '.png';
        });
        let first = type.result;
        let second = [];
        if (type.result.length > 10) {
          first = type.result.slice(0, 9);
          second = type.result.slice(9);
        }
        this.setData({
            elements: first,
            otherNavList: second
        });
      }
      // 获取商品列表
      this.setData({
        params: {area: this.data.userArea, type: this.data.elements[0].key, exchange: '0'}
      });
      this.getGoodsList(this.data.params);

    }
  },
  methods: {
    /**
     * 错误图片展示
     * @param event
     */
    getError (event) {
      const {index, params} = event.currentTarget.dataset
      if (this.data.elements.filter((item) => item.key == params.key).length > 0) {
        let imglist = this.data.elements;
        imglist[index].imageSrc = this.data.imagesUrl + 'xygou.png';
        this.setData({
          elements: imglist
        });
      }
      if (this.data.otherNavList.filter((item) => item.key == params.key).length > 0) {
        let imglist = this.data.otherNavList;
        imglist[index].imageSrc = this.data.imagesUrl + 'xygou.png';
        this.setData({
          otherNavList: imglist
        });
      }
    },
    saoFun: function () {
      wx.scanCode({
        complete (info) {
          if (info.errMsg === "scanCode:ok") {
            // 扫码成功
            console.log(info.result)
            // 跳转浏览器
            wx.navigateTo({
              url: '/pages/user-measures/web-view/loading?url=' + info.result
            })
          }
        }
      })
    },
    // 显示菜单中其余菜单
    showAllNaves(event){
      this.setData({
        showOtherNavList:!this.data.showOtherNavList
      })
    },
    // 显示个人信用币详情
    showCreditCoin(){
      this.setData({
        xybQuery: {
          status: '',
          date: '',
          next: '0'
        }
      });
      if (this.data.showmain) {
        this.getXybByDate(true);
      }
      this.setData({
        showmain: !this.data.showmain
      });

      if (this.data.showmain) {
        this.setData({
          params: {
            area: this.data.userArea,
            type: this.data.elements[0].key,
            exchange: '0'
          },
          isShowOFme: false
        });
        this.getGoodsList(this.data.params);
      }
    },
    /**
     * 获取 某个月的信用币记录列表
     */
    getXybByDate(flag) {
      if (this.data.xybQuery.next != '0') {
        return;
      }
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 2000
      });
      let that = this;
      GoodsServiceApi.$getXybByDate(this.data.xybQuery).then(function (res) {
        wx.hideToast();
        if (res.code === 1) {
          // console.log(res);
          if (res.result && res.result.children) {
            res.result.children.forEach(function (item) {
              item.CREATE_TIME = Utils.formatTime(item.CREATE_TIME);
              var desc = '';
              // 信用币类型：0：信用分兑换、1：完成认证:2：商户入驻、3：提供服务:、4：登录、5：兑换失效返还、6、退货返还、7、换货返还，8：兑换商品
              if (item.TYPE == '0') {
                desc = '信用分兑换';
              } else if (item.TYPE == '1') {
                desc = '完成认证';
              } else if (item.TYPE == '2') {
                desc = '商户入驻';
              } else if (item.TYPE == '3') {
                desc = '提供服务';
              } else if (item.TYPE == '4') {
                desc = '连续' + item.DAYS + '天登录';
              } else if (item.TYPE == '5') {
                desc = '兑换失效[' + item.SPMC + ']';
              } else if (item.TYPE == '6') {
                desc = '退货[' + item.SPMC + ']';
              } else if (item.TYPE == '7') {
                desc = '换货[' + item.SPMC + ']';
              } else if (item.TYPE == '8') {
                desc = '兑换商品：[' + item.SPMC + ']';
              }
              item.desc = desc;
            });
          }
          if (res.result) {
            let arr = new Array();
            arr.push(res.result);
            that.setData({
              goodList: flag ? arr : that.data.goodList.concat(arr),
              ['xybQuery.date']: res.result.C_DATE
            });
          } else{
            that.setData({
              ['xybQuery.next']: '1'
            });
          }
          console.log(that.data.goodList);
        }
      });
    },
    nextXyb() {
      this.getXybByDate(false);
    },
    //  选择下拉框
    changeSelect(){
      this.setData({
        showOptions:!this.data.showOptions
      })
    },
    selectRule (e) {
      var status = e.detail;
      this.setData({
        xybQuery: {
          status: status,
          date: '',
          next: '0'
        }
      });
      this.getXybByDate(true);
    },
    // 显示积分规则
    handelShowRule(){
      let that = this;
      GoodsServiceApi.$getXybRule({}).then(function (res) {
          if (res.code === 1) {
            // console.log(res);
            that.setData({
              integrationRule: res.result,
              showIntegrationRule:true
            });
          }
      });
    },
    closeShowRule(){
      this.setData({
        showIntegrationRule:false
      })
    },
    /**
     * 仅我可见的选择
     */
    checkFun() {
      this.setData({
        isShowOFme: !this.data.isShowOFme
      });
      var exchange = this.data.isShowOFme ? '1' : '0';
      this.setData({
        ['params.exchange']: exchange
      });
      this.getGoodsList();
    },
    /**
     * 区域选择
     * @param e
     */
    dictChangeFun(e) {
      this.setData({
        ['params.area']: e.detail
      });
      this.getGoodsList();
    },
    /**
     * 区域选择
     * @param e
     */
    typeChangeFun(e) {
      var type = e.currentTarget.dataset.params.key;
      this.setData({
        ['params.type']: type
      });
      this.getGoodsList();
    },
    /**
     * 获取信用币数量
     */
    getXybNumber() {
      let that = this;
      GoodsServiceApi.$getXybNumber({}).then(function (res) {
        if (res.code === 1) {
          // console.log(res);
          that.setData({
            currentXyb: res.result.currentXyb,
            consumedXyb: res.result.consumedXyb
          });
        }
      });
    },
    /**
     * 获取商品列表
     */
    getGoodsList() {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 2000
      });
      let that = this;
      GoodsServiceApi.$getGoodsList(this.data.params).then(function (res) {
        wx.hideToast();
        if (res.code === 1) {
          // console.log(res);
          if (res.result) {
            res.result.forEach(function (item) {
              if (item.ztList.length > 0) {
                item.ztFilePath = that.data.viewFile + "?path=" + item.ztList[0].filePath;
              }
            });
            that.setData({
              dataList: res.result
            });
          } else {
            that.setData({
              dataList: []
            });
          }
        }
      });
    },
  }
})
