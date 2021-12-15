
const app = getApp();
import CompanyApi from '../../api/service/visitorAppointment.js';
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    parkListArr:[],
    list:[],
    radio: '',
    parkId:'',
    value:''
  },
  onLoad(options) {
    // let list = [];
    // for (let i = 0; i < 26; i++) {
    //   list[i] = String.fromCharCode(65 + i)
    // }
 
    // this.setData({
    //   list: list,
      // listCur: list[0]
    // })
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

  },
  getCompanyData(){   
    /**请求数据 */
    wx.showLoading({title: '加载中...'});
    console.log(this.data.value,'---')
    console.log(this.data.parkId,'2222')
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
                        list:resu.suiy
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

    return {obj,suiy}
  },
  onChange(event) {
      this.setData({
        radio: event.detail,
      });
  },
  onSearchWordChange(e) {
     
      this.setData({
        value: e.detail.value,
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
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  }
});