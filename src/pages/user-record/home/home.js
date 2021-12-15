import ConsumeApi from "../../../api/consumeApi";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Conf from "../../../config/conf";
import Utils from "../../../utils/utils";

Component({
  options: {
    addGlobalClass: true,
  },
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

  data: {
    appImgUrl:getApp().globalData.appUrl,
    // 当前页
    currentPage: 1,
    // 数据总页数
    totalPages: 0,
    length: 10,
    status:'',
    keyword:'',
    showOptions: false, // 显示options
    ruleList:[], // 状态类型
    active:"a",
    triggered: false,
    optionA: [
      { text: '全部', value: 'all' },
      { text: '待服务', value: '4' },
      { text: '待完成', value: '0' },
    ],
    optionB: [
      { text: '全部', value: 'all' },
      { text: '超时完成', value: '2' },
      { text: '已换货', value: '8' },
    ],
    optionC: [
      { text: '全部', value: 'all' },
      { text: '超时取消', value: '6' },
      { text: '已退货', value: '7' },
    ],
    selectValue: 'all',
    list:[]
  },
  lifetimes: {
    attached: async function () {
      try {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        // 获取服务记录 数据
        this.getDataList();
      } catch (e) {
        console.error(e);
      }
    }
  },
  methods:{
    selectChange(e){
      this.setData({
        status:e.detail==='all'?'':e.detail
      })
      this.getDataList(true);
    },
    onRefresh() {
      let that = this;
      setTimeout(() => {
        // 数据成功后，停止下拉刷新
        that.setData({
          triggered: false,
        })
      }, 1000);
      that.getDataList(true);
    },
    // 分页加载数据
    loadMore: function (e) {
      console.log(e)
      if (this.data.currentPage >= this.data.totalPages) {
        return;
      }
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.getDataList();
    },
     //  选择下拉框
     onChange(){
      this.setData({
        value2:"a"
      })
    },
    keySearch(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.getDataList(true);
    },
    keyCancel(){
      this.setData({
        keyword: '',
      });
    },
    keyClick(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.getDataList(true);
    },
    tabChange(event){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.setData({
        active: event.detail.name,
        selectValue: 'all',
        status:''
      });
      this.getDataList(true);
    },
    /**
     * 是否刷新
     * @param isRefresh
     */
    getDataList(isRefresh = false) {
      if (isRefresh) {
        // 刷新时候 页码重置
        this.setData({
          currentPage: 1,
          list:[]
        });
      }
      let that = this;
      ConsumeApi.$getConsumeRecordList({
        type: this.data.active,
        name: this.data.keyword,
        status: this.data.status,
        start: (this.data.currentPage-1)*this.data.length,
        length: this.data.length
      }).then(function (res) {
        if (res.code === 1) {
          // 请求成功
          Toast.clear();
          that.setData({
            totalPages: res.result.totalPages,
            list: isRefresh ? res.result.list : that.data.list.concat(res.result.list)
          });
        }
      })
    },
    handelDetail(e){
      if(e.currentTarget.dataset.fwfs == '0'){
        wx.navigateTo({
          url: '/pages/user-goods/details/index?id='+e.currentTarget.dataset.spdhid,
          success: function(res){},
          fail: function() {},
          complete: function() {}
        });
      }else{
        wx.navigateTo({
          url: '/pages/user-record/details/index?id='+e.currentTarget.dataset.detailid,
          success: function(res){},
          fail: function() {},
          complete: function() {}
        });
      }
    },
    evaluate(e){
      wx.navigateTo({
        url: '/pages/user-record/evaluate/index?id='+e.currentTarget.dataset.detailid,
        success: function(res){},
        fail: function() {},
        complete: function() {}
      });
    },
  }
})
