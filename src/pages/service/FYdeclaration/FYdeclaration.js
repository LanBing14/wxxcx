// pages/service/FYdeclaration/FYdeclaration.js
import homeInform from '../../../api/service/FYdeclaration.js';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      appImgUrl:getApp().globalData.appUrl,
      CustomBar: app.globalData.CustomBar,
        list:[],
        triggered: false,
        // 当前页
        currentPage:1,
        totalPages:0, // 数据总页数
        length:10,//每页10条
        isLoading:false,
        // 当前页(0是第一页)
        start:0, // start就相当于这一页第一个数据的下标
        status:'', // status 1未申报 2已申报 不填是全部
    },

    onChange(event) {
        this.setData({
            status: `${event.detail.name}`
          });
        this.getFyList(true);
    },
    // 去防疫申报详情
    toFYsbao(event){

        let {id,status, declarationid} = event.currentTarget.dataset;
        if(status==1){
            wx.navigateTo({
                url: '/pages/service/FYdeclarationDetail/FYdeclarationDetail?id='+ id + "&declarationId=" + declarationid
            })
        }else{
            wx.navigateTo({
                url: '/pages/service/FYdeclarationHasDetail/FYdeclarationHasDetail?id='+ id + "&declarationId=" + declarationid
            })
        }
    },
    onRefresh() {
        let that = this;
        setTimeout(() => {
            // 数据成功后，停止下拉刷新
            that.setData({
                triggered: false,
            })
        }, 1000);
        that.getFyList(true);
    },
      // 分页加载数据
    loadMore() {
        if (this.data.currentPage >= this.data.totalPages) {
            return;
        }
        this.setData({
            currentPage: this.data.currentPage + 1
        });
        if(!this.data.isLoading){
            this.getFyList(false);
        }

    },
    // 获取防疫申报数据
    getFyList(isRefresh = false){
        this.setData({
            isLoading:true
        })
        if (isRefresh) {
            // 刷新时候 页码重置
            this.setData({
              currentPage: 1,
              list:[]
            });
        }
        let that = this;
        wx.showLoading({title: '加载中...'});
        homeInform.$getInformList({
            status:this.data.status,
            start:(this.data.currentPage - 1)*(this.data.length),
            length:this.data.length
        }).then((res)=>{

           if(res.code===1){
             this.setData({
                totalPages:res.result.totalPages,
                list:isRefresh? res.result.list: that.data.list.concat(res.result.list)
             })
           }
           wx.hideLoading();
           this.setData({
               isLoading:false
           })
        })

    },

    /** */
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**获取防疫申报列表 */
        //  this.getFyList(true)
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
        this.getFyList(true)
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
