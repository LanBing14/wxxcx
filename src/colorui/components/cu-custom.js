import StorageUtils from "../../utils/storageUtils";


const app = getApp();
Component({
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的对外属性
     */
    properties: {
        bgColor: {
            type: String,
            default: ''
        },
        isCustom: {
            type: [Boolean, String],
            default: false
        },
        isBack: {
            type: [Boolean, String],
            default: false
        },
        bgImage: {
            type: String,
            default: ''
        },
        textColor: {
            type: String,
            value: "#fff"
        },

        setBgColor:{
            type: String,
            value: "#10c2b8"
        },
        isScan: {
            type: Boolean,
            default: false
        },
        isHaveBackground: {
            type: Boolean,
            default: false
        },
        isBackIcon:{
          type:Boolean,
          default: true
        },
        backgroundColor: {
          type:String,
          default: "#11c2b8"
        },
        selfBack:{
          type:Boolean,
          default:false
        }
    },




    /**
     * 组件的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        appImgUrl:getApp().globalData.appUrl
    },
        /**
         * 组件的方法列表
         */
        methods: {
            BackPage() {
      
              if(this.data.selfBack){
                this.triggerEvent('selfDBack')
              }else{
                wx.navigateBack({
                    delta: 1
                });
              }
            },
            toHome() {
                wx.reLaunch({
                    url: '/pages/index/index',
                })
            },
            // 扫一扫
            handelScan() {
                /*wx.scanCode({
                    success(res) {
                      console.log(res.result);
                      var result = JSON.parse(res.result.trim());
                      var type = result.type;
                      var id = result.serviceId;
                      var userId = result.userId;
                      var spxxId = result.spxxId;
                      var tyshxydm = result.tyshxydm;
                      var score = '';
                      var level = '';

                      var userInfo = StorageUtils.get(StorageUtils.key.userInfo);

                      RequestApi.$consumerGetScore({cxXm: userInfo.username, cxSfzh: userInfo.idCard}).then(data => {
                        if (data.result){
                          var score="";
                          var level="";
                          if (data.result.data) {
                            score = data.result.data.score;
                            level = data.result.data.levelName;
                          }

                          console.log("score="+score);
                          console.log("level="+level);

                          let params = 'type=' + type + '&serviceId=' + id + '&userId=' + userId + '&score=' + score + '&level=' + level;
                          if (type == 'fwxx'){
                            RequestApi.$consumerScanSYFW({"id":id}).then(res => {
                              console.log(res);
                              if (res) {
                                var result = res.result;
                                if (result == "当前服务不可用") {
                                  wx.showToast({
                                    title: '当前服务不可用！',
                                    icon: "none",
                                    duration: 2000
                                  });
                                }else if (result){
                                  console.log("params====="+params);
                                  wx.navigateTo({
                                    url: '/pages/tgfw/tgfw?'+params,
                                  });
                                } else {
                                  wx.showModal({
                                    title: '提示',
                                    content: '是否允许获取您的评分评级信息？',
                                    confirmText:'允许',
                                    cancelText:'拒绝',
                                    success: function (res) {
                                      if (res.confirm) {
                                        RequestApi.$consumerScanSQYX({"id":id}).then(res => {
                                          wx.navigateTo({
                                            url: '/pages/tgfw/tgfw?'+params,
                                          });
                                        });
                                      }else {
                                        wx.hideModal();
                                        wx.showToast({
                                          title: '您已拒绝授权，暂时不能使用服务。',
                                          icon: "none",
                                        });
                                      }
                                    }
                                  })

                                }
                              }
                            });
                          }else if (type == 'spxx') {
                            wx.navigateTo({
                              url: '/pages/user-goods/good-detail/index?spxxId='+id,
                            });
                          } else if (type == 'cxmp') {
                            wx.navigateTo({
                              url: '/pages/user-cxmp-index/index?tyshxydm='+tyshxydm,
                            });
                          }
                        }
                      });
                    }
                })*/
            }
        }
})
