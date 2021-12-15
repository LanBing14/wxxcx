// pages/service/components/companyChoose/companyChoose.js
import CompanyApi from '../../../../api/service/visitorAppointment.js';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parkId:{
      type:String,
      default:''
    },

    /**radio表示现在选中的是哪个 */
    radio:{
      type:String,
      default:''
    },
    indexBarTop:{
      type:Number,
      default:0
    },
    searchWrapHeight:{
      type:Number,
      default:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    
    offsetTop:0,

    value:'',//搜索关键词
    indexList:[],//索引
    parkListArr:[],
    getChuanCompanyId:'',
 
    allitem:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
        })
        
        this.triggerEvent('closeCompanyChoose', this.data.allitem)

    },
      /**获取公司数据 */
    getCompanyData(){
       wx.showLoading({title: '加载中...'});
        /**请求数据 */
      
        CompanyApi.$getCompanyList({key:this.data.value,parkId:this.data.parkId}).then((res)=>{

            if(res.code===1){
                let listArr = res.result;
                let resu=this.processingData(listArr)
                this.setData({
                    parkListArr:[]
                })
                for(let i in resu.obj){
                    this.setData({
                        [`parkListArr.${i}`]:resu.obj[i]
                    })
                }

                this.setData({
                    indexList:resu.suiy
                })
                wx.nextTick(() => {
                  wx.hideLoading(); // 在当前同步流程结束后，下一个时间片执行
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

    selfBack(){ 
      this.triggerEvent('closeCompanyChoose', this.data.allitem)
    }
  },
  lifetimes: {
    created(){
      
    },
    attached: function() {
    
    },
  
    detached(){
    
    },
    ready(){
      
    }
  },

})
