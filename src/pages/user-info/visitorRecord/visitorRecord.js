import RequestApi from "../../../api/requestApi";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    status: "",
    visitorList: [],
    active: 0,
    params: {
      start: 1,
      size: 10
    },
    totalRecords: 0,
    totalPages:0,
    loading: false,
    isRefresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  //tab切换
  onChange(event) {
    if(event.detail.title === "全部"){
      this.setData({
        status: ""
      });
    }else{
      this.setData({
        status: event.detail.title
      });
    }
    this.data.params.start = 1;
    this.getList();
  },
  linkToDetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.item.ID;
    let data = e.currentTarget.dataset.item;
    try {
      wx.setStorageSync('visitors', JSON.stringify(data));
    } catch (e) {}
    wx.navigateTo({
      url: `/pages/user-info/visitorCode/visitorCode?id=${id}`
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
  getList(isRefresh = false){
    const data = {
      ...this.data.params,
      status: this.data.status
    };
    // this.setData({
    //   loading: true
    // })
    wx.showLoading({
      title: '加载中',
    });
    RequestApi.$getVisitInfo(data).then(res =>{
      // this.setData({
      //   loading: false
      // })
      wx.hideLoading()
      if(res.code === 1){
          this.setData({
            visitorList: isRefresh? [...this.data.visitorList,...res.result.list] : res.result.list,
            totalRecords: res.result.totalRecords
          })
      }
    }).catch(err =>{
      console.log(err)
    })
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
  onRefresh() {
    this.setData({
      isRefresh: false,
    })
    this.setData({
      ["params.start"]:  this.data.params.start++
    })
    if(this.data.totalRecords === this.data.visitorList.length){
      wx.showToast({
        title: "没有更多数据",
        icon:"none",
        duration: 1000
      }); 
       return
    }
    this.getList(true)
  },
  //取消预约
  handelCancel(event){
    const id =  event.currentTarget.dataset.id;
    RequestApi.$handelCancel({id}).then(res =>{
      if(res.code === 1){
        wx.showToast({
          title: res.result,
          icon:"none",
          duration: 1000
        });
        this.getList(false);
      }
    }).catch(err =>{

    })

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
