// pages/IndexPages/indexPages.js
const app = getApp();
import CompanyApi from '../../api/service/visitorAppointment.js';
Page({

    /**
     * 页面的初始数据
     */
     data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        radio: '',
        offsetTop:0,
        searchWrapHeight:0,
        value:'',//搜索关键词
        indexList:[],//索引
        parkListArr:[],
        getChuanCompanyId:'',
        parkId:'',
        allitem:'',

    },
    onChange(event) {
        this.setData({
          radio: event.detail,
        });
    },
    onSearchWordChange(e) {
        this.setData({
          value: e.detail,
        });
        this.getCompanyData()
    },
    onClick(event) {
        
        const { name,allitem} = event.currentTarget.dataset;
   
        this.setData({
            radio: name,
            allitem:allitem
        });
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];

        prevPage.setData({
            company:this.data.allitem
        })
        wx.navigateBack({
            delta: 1  // 返回上一级页面。
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let query = wx.createSelectorQuery();

        query.select('.searchWrap').boundingClientRect(rect=>{

            let height =rect? rect.height:54;
            let top=this.data.CustomBar+height;
            
            this.setData({
                offsetTop:top,
                searchWrapHeight:height
            },()=>{
                if(options.companyId){
                    this.setData({
                        getChuanCompanyId:options.companyId,
                        radio:options.companyId
                    })
                   
                }
        
               if(options.parkId){
                   this.setData({
                       parkId:options.parkId
                   })
               }
               
               this.getCompanyData()
            })

           
        }).exec();
     

    },
    /**获取公司数据 */
    getCompanyData(){
        
        /**请求数据 */
        wx.showLoading({title: '加载中...'});
        CompanyApi.$getCompanyList({key:this.data.value,parkId:this.data.parkId}).then((res)=>{
            if(res.code===1){
                let listArr = res.result;
                let resu=this.processingData(listArr)
                this.setData({
                    parkListArr:[]
                },()=>{

                    let promiseArr=[]
                    for(let i in resu.obj){
                        promiseArr.push(new Promise((reslove,reject)=>{
                            this.setData({
                                [`parkListArr.${i}`]:resu.obj[i],
                            },()=>{
                                reslove()
                            })
                        }))

                     }
               
                     Promise.all(promiseArr).then(res=>{
                        this.setData({
                            indexList:resu.suiy
                        },()=>{
                            wx.hideLoading();
                        })
                        
                        
                     })
                     
     
                   
                })

               
            }else{
                wx.hideLoading();
            }
        })
    },

    /**处理拿到的数据 */
    processingData(listArr){
        let arr=[];
        let obj={};
        let suiy=[];
        
        listArr.forEach(item=>{
            let zm = item.JP.toLocaleUpperCase()
            if(!obj[zm]){
                obj[zm]=[]
                suiy.push(zm)
            }
            item['label']=item.ENTERPRISE_NAME;
            item['id']=item.ID;

            obj[zm].push(item)
        })
       
        // for(let i in obj){
        //     suiy.push(i)
        //     let obj2={}
        //     obj2['zm'] = i;
        //     obj2['list'] = obj[i]
        //     arr.push(obj2)
        // }

        return {obj,suiy}
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
    onPageScroll(e){
 
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