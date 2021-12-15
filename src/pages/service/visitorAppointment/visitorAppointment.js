// pages/service/visitorAppointment/visitorAppointment.js
import WxValidate from '../../../utils/WxValidate.js'
import visitorApi from '../../../api/service/visitorAppointment.js'
import StorageUtils from '../../../utils/storageUtils';
import RequestApi from "../../../api/requestApi";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    pageShow:true,/**页面主体内容是否显示 */
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    indexBarTop:0,
    searchWrapHeight:0,
    
    /**关于车牌 */  
    cardNoArr:[
      {
        cardNo:"",// 车牌输入类型，1简称，2数字或者字母,
        isxin:false,
        inputType:1
      }
    ],
    sex: '0',// 性别
    show: false,
    /**到访日期 */
    date: '',
    sendDate:'',
    /**公司 */
    company:'',
    /**关于车牌结束 */
    form:{
        name:'',  //访客姓名
        Tel:StorageUtils.get(StorageUtils.key.userInfo).mobile?StorageUtils.get(StorageUtils.key.userInfo).mobile:'',// 联系方式
        thing:'', // 来访事由
        suiNum:'' // 随行人数
    },
    thingVal:'',
    thingArr:[],
    reasonArr:[],

    /**自定义车牌 */
    carNo: '',
    translateSpace: 0,
    inputType: 1, // 车牌输入类型，1简称，2数字或者字母,
    showPlateInput: false,
    nowCurrentIndex:0,
    /**自定义车牌结束 */


    lock: false, // 防止页面的按钮重复点击
  },

  /**自定义键盘 */
    /**translate重置 */
    setTransLate(){
      this.setData({
        showPlateInput:false,
        translateSpace: 0
      })
    },

    /**隐藏键盘 */
    hidePlateInput(){
      this.setData({
        showPlateInput:false,
        translateSpace:0
      })
    },


    handleClickShowXin(e){

      let nowIndex = e.currentTarget.dataset.index;
      console.log(this.data.cardNoArr[nowIndex],'00000')
      this.setData({
        [`cardNoArr[${nowIndex}].isxin`]:!this.data.cardNoArr[nowIndex].isxin
      })
    },
  /**自定义键盘 */

  /**自定义键盘 */
     /* 用于点击弹出键盘输入，space为键盘弹出后向上拉取的距离 */
  handleClick(e) {

      this.setData({
         showPlateInput: true,
      })

      if(this.data.translateSpace==0){
        const child = this.selectComponent('#carPlate');
        let query = wx.createSelectorQuery().in(child);
        query.select('.carPlate').boundingClientRect(rect=>{
              
              this.setData({
                translateSpace: rect.height,
             })
            
        }).exec();
      }


      /* regExp用于判断当前已输入的车牌号是否是中文，并让键盘显示中文还是英文输入 */
      let regExp = /^[\u4e00-\u9fa5]+/;
      

      /**看看现在点击的是第几个车牌号 */

      let index = e.currentTarget.dataset.index;
    
      let inputType =this.data.cardNoArr[index].inputType;
    
      /** */
      if(regExp.test(this.data.cardNoArr[index].cardNo)) {
        inputType = 2;
      }
    
      this.setData({
        nowCurrentIndex:index,
        [`cardNoArr[${index}].inputType`]:inputType
      })

     
  },
  /* 键盘输入操作 */
  handlePlateChange2(e) {
    let value = e.detail.value;
    let type = e.detail.type;
    let cardNo = this.data.cardNoArr[this.data.nowCurrentIndex].cardNo;

    if(this.data.cardNoArr[this.data.nowCurrentIndex].isxin){  // 是新能源

     if(cardNo.length>7){
       return
     }
    }else{// 不是新能源

      if(cardNo.length>6){
        return
      }

    }
    cardNo += value;
  
    if(type == 1) {
      this.setData({
        [`cardNoArr[${this.data.nowCurrentIndex}].inputType`]: 2
      })
    }
    let nowC="cardNoArr["+this.data.nowCurrentIndex+"].cardNo"
    this.setData({
      [nowC]:cardNo
    })
  },

 /* 点击键盘上的确定 */
  handlePlateConfirm() {
    /* isCarPlate用于判断输入的车牌号是否符合规范 */

    if(this.data.cardNoArr[this.data.nowCurrentIndex].isxin){
      if (!this.isNewCarPlate(this.data.cardNoArr[this.data.nowCurrentIndex].cardNo)) {
        wx.showToast({
          title: '请输入正确的新能源车牌号',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }else{
      if (!this.isCarPlate(this.data.cardNoArr[this.data.nowCurrentIndex].cardNo)) {
        wx.showToast({
          title: '请输入正确的车牌号',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }


    this.setData({
      translateSpace: 0,
      showPlateInput: false,
      // inputType: 1
    })
  },
  /* 用于键盘输入删除 */
  handlePlateDelete(e) {
    let cardNo = this.data.cardNoArr[this.data.nowCurrentIndex].cardNo
    cardNo = cardNo.substring(0, cardNo.length - 1);
    if(cardNo.length == 0) {
      this.setData({
        [`cardNoArr[${this.data.nowCurrentIndex}].inputType`]: 1
      })
    }
    this.setData({
      [`cardNoArr[${this.data.nowCurrentIndex}].cardNo`]:cardNo,
    })
  },
  /**自定义键盘 */
  jia(e){

    let arr=this.data.cardNoArr;
    let index=e.currentTarget.dataset.index;
    arr.push(
      {
        cardNo:"",
        inputType:1,// 车牌输入类型，1简称，2数字或者字母,
        isxin:false // 是不是新能源
      }
    )
  
    this.setData({
      cardNoArr:arr
    })

  },
  jian(e){

    let arr2=this.data.cardNoArr;
    let index=e.currentTarget.dataset.index;
    if(arr2.length==1){
      this.setData({
        "cardNoArr[0].cardNo":'',
        "cardNoArr[0].inputType":1
      })
      return;
    }
    arr2.splice(index,1)

    this.setData({
      cardNoArr:arr2
    })
   
  },
  // 来访事由变化
  changeThingIndex(event){
    let {value}=event.detail;
    this.setData({
      thingVal:value
    })
  },
  /**性别选择修改 */
  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  /**日期选择方法 */
  onDisplay() {
    this.hidePlateInput()
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      sendDate:new Date(event.detail),
      date: this.formatDate(event.detail),
    });
  },
/**日期选择方法结束 */

  /**到访公司 */
  showCompanyChoose(){
    
    this.hidePlateInput()
    let companyId = this.data.company.ID ? this.data.company.ID : '';
    wx.navigateTo({
      url: "/pages/companyChoosePage/companyChoosePage?companyId=" + companyId
    });
    // this.setData({
    //   pageShow:false
    // })
    // if(this.data.indexBarTop==0){
    //   const child = this.selectComponent('#companyChooseC');
    //   let query = wx.createSelectorQuery().in(child);
    //   query.select('.searchWrap').boundingClientRect(rect=>{
    //         let height = rect.height;
    //         let top=this.data.CustomBar+height;
  
    //         this.setData({
    //           searchWrapHeight:height,
    //           indexBarTop:top
    //         })
    //         child.getCompanyData()
    //   }).exec();
    // }
  },


  /**填报人姓名 */
  changeName(event){
    this.setData({
      ['form.name']: event.detail.value,
    })
  },


  /**联系电话 */
  changeTel(event){
    this.setData({
      ['form.Tel']: event.detail.value,
    })
  },

  /**来访事由 */
  changeTel(event){
    this.setData({
      ['form.thing']: event.detail.value,
    })
  },

  /**随行人数 */
  changeSuiNum(event){
    this.setData({
      ['form.suiNum']: event.detail.value,
    })
  },

 /* 键盘输入操作 */
 handlePlateChange(e) {
  
  let value = e.detail.value;
  let type = e.detail.type;
  let nowC="cardNoArr["+e.currentTarget.dataset.index+"].cardNo"
  this.setData({
    [nowC]:value
  })
 },
//  onPageScroll(event) {
//   // this.scrollTop = event.scrollTop;
// },
/**关闭选择公司组件 */
closeCompanyChoose(e){
  
  this.setData({
    company:e.detail,
    pageShow:true
  })
  wx.pageScrollTo({
    scrollTop: 0,
    duration: 0
  })


},


 /* 判断车牌号 */
 isCarPlate(value) {
  return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(value);
 },

 /**判断是不是新能源 */
 isNewCarPlate(value) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/.test(value);
 },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(load) {
   
    this.initValidate()//验证规则函数
    this.getReason().then(()=>{
      if(load.id){
        let id= load.id;
        visitorApi.$getDetail({id:id}).then(res=>{
   
            if(res.code==1){
              let resU=res.result.visitInfo;
          
              let kongC=[]
              let arrCar=resU.carNumber? resU.carNumber.split(','):''
              if(Array.isArray(arrCar)&&arrCar.length>0){
                arrCar.forEach(item=>{
                  let o={}
                  o['cardNo'] = item;
                  kongC.push(o)
                })

                this.setData({
                  cardNoArr:kongC
                })
              }
              console.log(resU,'详情')
              let companyInfo={
                  label:resU.enterpriseName,
                  ID:resU.visitSubject
              }

              this.setData({
                ['form.sex']:resU.type,
                ['form.name']:resU.visitorName,
                ['form.Tel']:resU.phoneNumber,
                ['form.suiNum']:resU.visitorNumber,
                company:companyInfo
              })
              let reasonArr= this.data.reasonArr;
              if(reasonArr.length>0&&Array.isArray(reasonArr)){
                 let index = reasonArr.findIndex(item=>item.id==resU.reason)
                 this.setData({
                   thingVal:index
                 })
              }
              
            }
        })

      }
      
    })
    
  },

  getReason(){
    
    return new Promise((resolve,reject)=>{
      visitorApi.$getReason().then(res=>{
  
        if(res.length>0&&Array.isArray(res)){
          let thingArr = res.map((item)=>{
              return item.text
          })
       
          this.setData({
            reasonArr:res,
            thingArr
          })
          resolve()
        }
      })
    })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      date:{
        required:true
      },
      company: {
        required:true
      },
      name:{
        required:true,
        maxlength:15
      },
      Tel:{
        required:true,
        mobile:true
      },
      thingVal:{
        required:true
      },
      suiNum:{
        required:true,
        maxlength:15
      }
    }
    const messages = {
      date:{
        required:'到访日期必填'
      },
      company: {
        required:'到访公司必填'
      },
      name:{
        required:'姓名必填',
        maxlength:'访客姓名最多15字'
      },
      Tel:{
        required:'联系方式必填',
        mobile:'手机号码不正确'
      },
      thingVal:{
        required:'来访事由必填',
      },
      suiNum:{
        required:"随行人数必填",
        maxlength:"最多15字"
      }
      
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  /**验证车牌号 */
  checkCarNo(index,value){

    if(!value.cardNo){
      return {msg:'第'+(Number(index)+1)+'车牌号不能为空'}
    }else{
      if(value.isxin){
        if(!this.isNewCarPlate(value.cardNo)){
          return {msg:'第'+(Number(index)+1)+'新能源车牌号不正确'}
        }
      }else{
        if(!this.isCarPlate(value.cardNo)){
          return {msg:'第'+(Number(index)+1)+'车牌号不正确'}
        }
      }
    }
  },

  /**表單驗證與提交 */

  formSubmit(e){

    let obj={
        date:this.data.date,
        company:this.data.company.label,
        ...e.detail.value,
        thingVal:this.data.thingVal
    }
   
    //校验表单
    if (!this.WxValidate.checkForm(obj)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /**验证车牌号码 */
    let cheError=[];
    let toCar=[]
    
    let cardIsNull = false;


    cardIsNull=this.data.cardNoArr.every(item=>item.cardNo=='')
    if(!cardIsNull){
      for(let i=0;i<this.data.cardNoArr.length;i++){
        toCar.push(this.data.cardNoArr[i].cardNo)
        let str=this.checkCarNo(i,this.data.cardNoArr[i])
        if(str){
          cheError.push(str)
        }
      }
    }

    

   
    if(cheError.length==0){
     
      let submit={
        type:this.data.sex,
        // visitingTime:this.data.sendDate,
        subscribeTime:this.data.sendDate,
        visitSubject:this.data.company.label,
        visitorName:obj.name,
        phoneNumber:obj.Tel,
        reason:this.data.reasonArr[this.data.thingVal].id,
        visitorNumber:obj.suiNum,
        carNumber:toCar.join(",")
      }
      

      let that = this;
      let {lock} = that.data;

      if(!lock){
        that.setData({lock:true},()=>{
               visitorApi.$visitorInfoSubmit(submit).then(res=>{
                    if(res.code==1){
                        that.hidePlateInput()
                        wx.showToast({
                          title: '预约成功',
                          icon: 'success',
                        })
                        let id=res.result;
                      
                        setTimeout(()=>{
                         
                          wx.redirectTo({
                            url: "/pages/user-info/visitorCode/visitorCode?id="+id
                          })
                        },1000)
                    }else{
                      that.hidePlateInput()
                      setTimeout(()=>{
                        that.setData({lock:false});
                      },1000)
                        
                    }
                })
        });
      }

  


    }else{
      this.showModal(cheError[0])
      return 
    }

    

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
