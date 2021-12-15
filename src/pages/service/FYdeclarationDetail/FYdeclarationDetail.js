// pages/service/FYdeclarationDetail/FYdeclarationDetail.js
import WxValidate from '../../../utils/WxValidate.js'
import homeInform from '../../../api/service/FYdeclaration.js';
import Conf from "../../../config/conf.js";
import Storage from '../../../utils/storageUtils';
import serviceCommonApi from "../../../api/parkApi.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    /**全部的详情描述 */
    fullDeclarationExplain:'',
    declarationExplain:'',
    /**防疫标题 */
    declarationSubject:'',
    viewFile:Conf.httpUrl.viewFile,
    isShowDetailBtn:true,
    isShouShow:false,
    upFile:Conf.httpUrl.uploadFile,
    form:{
      companyName:'',//公司名称
      name:'',  //填报人姓名
      idNo:'',// 身份证号码
      Tel:'',// 联系电话
      showPosition:'',  // 居住地址
      detailPosition:'', // 详细地址
      ymjz:'', //疫苗接种
      colorJ:'' //健康码颜色
    },
    /**这里是选择省市区县 */
    multiArray: [['苏州市'],['吴中区','吴江区'],['越溪街道','华阳街道']],
    multiIndex: [0, 0, 0],
    chinaData: [],
    /**健康码 */
    fileList:[],

    /**行程码图片 */
    fileList1:[],

    isImg:false,

    /**下面开始动态生成表单 */
    configList:[],
    timeshow:false,
    id:'',
    saveAreaIndex:'',
    lock: false, // 防止页面的按钮重复点击
    dateNowIndex:''
  },
  /**企业名称 */
  changeCompanyName(event){
    this.setData({
      ['form.companyName']: event.detail.value,
    })

  },
  /**填报人姓名 */
  changeName(event){
    this.setData({
      ['form.name']: event.detail.value,
    })
  },

  /**身份证号码 */
  changeIdNo(event){
    this.setData({
      ['form.idNo']: event.detail.value,
    })
  },
  /**联系电话 */
  changeTel(event){
    this.setData({
      ['form.Tel']: event.detail.value,
    })
  },
  /**详细地址 */
  changeDetailPosition(event){
    this.setData({
      ['form.detailPosition']: event.detail.value,
    })
  },
  /**地区选择 */
  bindMultiPickerChange: function(e) {
    let nowIndex=e.currentTarget.dataset.nowindex;

    let shi=this.data.multiArray[0][this.data.configList[nowIndex].multiIndex[0]];
    let qu=this.data.multiArray[1][this.data.configList[nowIndex].multiIndex[1]];
    let jieD=this.data.multiArray[2][this.data.configList[nowIndex].multiIndex[2]];
    let str=shi+"，"+qu+"，"+jieD;
    let item = "configList["+nowIndex+"].value";
    this.setData({
      [item]:str
    })
  },
  bindMultiPickerColumnChange: function(e) {

    let nowIndex=e.currentTarget.dataset.nowindex;
    var move = e.detail;
    var index = move.column;
    var value = move.value;



    let multiIndex = "configList["+nowIndex+"].multiIndex";


    if (index == 0) {
      this.setData({
        [multiIndex]: [value,0,0,0]
      })
      this.getCity(this.data.saveAreaIndex)
    }
    let itemOne="configList["+nowIndex+"].multiIndex[1]";
    let itemTwo="configList["+nowIndex+"].multiIndex[2]";
    let itemThree="configList["+nowIndex+"].multiIndex[3]"
    if (index == 1) {

      this.setData({
        [itemOne]: value,
        [itemTwo]: 0,
        [itemThree]: 0
      })
      this.getXian(this.data.saveAreaIndex);

    }
    if (index == 2) {
      this.setData({
        [itemTwo]: value,
        [itemThree]: 0,
      })


    }


  },


  /**疫苗接种 */
  changeYmjz(event) {
    this.setData({
      ['form.ymjz']: event.detail,
    })
  },
  /**健康码颜色 */
  changeColorJ(event){
    this.setData({
      ['form.colorJ']: event.detail
    })

  },

  saveQuIndex(e){
    this.setData({
      saveAreaIndex:e.currentTarget.dataset.nowindex
    })
    this.getCity(this.data.saveAreaIndex); // 得到市
  },

  /**健康码图片上传 */

  beforeRead(event) {
    this.setData({
      isImg:false
    })
    const { file, callback } = event.detail;
    if(file.size<10485760){
      callback(true)
    }else{
      wx.showModal({
        content: '不能大于10M',
        showCancel: false,
      })
      callback(false)
    }
    let fileArr=file.url.split(".")
    if(fileArr[fileArr.length-1] === 'jpg'||fileArr[fileArr.length-1] === 'png'||fileArr[fileArr.length-1] === 'jpeg'){
       this.setData({
        isImg:true
       })
    //     if(file.size<10485760){
    //       callback(true)
    //     }else{
    //       wx.showModal({
    //         content: '不能大于10M',
    //         showCancel: false,
    //       })
    //       callback(false)
    //     }
    // }else{
    //   wx.showModal({
    //     content: '只能选jpg与png格式',
    //     showCancel: false,
    //   })
    //   callback(false)
    }

  },
  /**上传后 */
  afterRead(event) {
    var index = event.currentTarget.dataset.index;
    const { file } = event.detail;
    let that = this;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url:this.data.upFile, // 仅为示例，非真实的接口地址
      filePath: file.url,

      name: 'files',
      success(res) {
        let result = JSON.parse(res.data).success;
        if(that.data.configList[index].value==""){
          that.data.configList[index].value=[]
        }

        const fileList =[...that.data.configList[index].value];
        fileList.push({ ...file,type:that.data.isImg? 'image':'file',filePath:result[0].path,fileName:result[0].name, name: result[0].name,url:that.data.viewFile+"?path="+result[0].path });
        let item = "configList["+index+"].value";

        that.setData({
          [item]:fileList
         });

      },
    });
  },

  /**删除文件 */
  deleteFile(e){
    console.log(e)
    let fIndex=e.currentTarget.dataset.findex;
    let item = "configList["+fIndex+"].value";


    this.setData({
      [item]:[]
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  /**时间选择面板 */
  chooseTimeShow(e){
    let timeIndex=e.currentTarget.dataset.index;
    this.setData({
      dateNowIndex:timeIndex,
      timeshow:true
    })
  },
  onTimeConfirm(e){
    let value = this.formatDate(e.detail);
    let index= e.currentTarget.dataset.index;
    let item = "configList["+this.data.dateNowIndex+"].value";
    this.setData({
      timeshow:false,
      [item]:value
    })

  },
  onTimeClose(){
    this.setData({
      timeshow:false
    })
  },
  getSiteData: function() {
    var that = this;
    serviceCommonApi.$getSanLian().then((res)=>{
        console.log(res,'多级联动数据')
        var chinaData = res.result;
        this.data.chinaData = chinaData;
        var sheng = []; //  设置省数组
        for(var i = 0; i < chinaData.length; i++) {
          sheng.push(chinaData[i].name);
        }
        this.setData({
          "multiArray[0]": sheng
        })

    })

  },
  getCity: function(saveIndex) { //  得到市

    var shengNum = this.data.configList[saveIndex].multiIndex[0];
    var chinaData = this.data.chinaData;
    var cityData = chinaData[shengNum].children;
    var city = [];
    for (var i = 0; i < cityData.length; i++) {
      city.push(cityData[i].name)
    }
    this.setData({
      "multiArray[1]": city
    })
    this.getXian(saveIndex);
  },
  getXian: function(saveIndex) { //  得到县
    var shengNum = this.data.configList[saveIndex].multiIndex[0];
    var cityNum = this.data.configList[saveIndex].multiIndex[1];
    var chinaData = this.data.chinaData;
    var xianData = chinaData[shengNum].children[cityNum].children;
    var xian = [];
    for (var i = 0; i < xianData.length; i++) {
      xian.push(xianData[i].name)
    }
    this.setData({
      "multiArray[2]": xian
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()//验证规则函数

    let id= options.id;
    let declarationId = options.declarationId;
    this.setData({
      "id":id
    })
    homeInform.$getFyDetail({fillId:id, declarationId: declarationId}).then(res=>{
      wx.showLoading({title: '加载中...'});

      if(res.code===1){

        wx.hideLoading();
        console.log(res,'这个是返回的数据-------------------')
        let declarationExplain=res.result.declaration.declarationExplain;
        let str = "";
        if(declarationExplain&&declarationExplain.length>70){
         str=declarationExplain.substring(0,70)+'...';
        }else{
          str=declarationExplain? declarationExplain:'';
          this.setData({
            isShowDetailBtn:false
          })
        }
        this.setData({
          fullDeclarationExplain:declarationExplain,
          declarationExplain:str,
          declarationSubject:res.result.declaration.declarationSubject,
          id: res.result.questionnaireFill.id
        })

        /**动态列表处理 */
        let configList=res.result.configList;
        let newConfig=[]
        console.log(configList,'哈哈哈')
        if(configList.length>0){
           newConfig = configList.map(item=>{
            item['value'] = "";
            if(item.declarationSubject== 'fill_blank'&& item.questionName=='现居住地（区/乡镇/街道）'){
              item['multiIndex'] = [0,0,0]
            }
            if(item.declarationSubject== 'pull_down'){
              item['array']=item.questionnaireItems.map(item2=>{
                 return item2.itemsName
              })
            }
            return item
          })
        }
        this.setData({
          configList:newConfig
        })
      }
    }).catch(err=>{
      wx.hideLoading();
    })
    this.getSiteData()
  },



  /**动态数据绑定 */

  /**填空题 */
  changeInput(e){
    let value = e.detail.value;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })


  },

  /**单选题 */
  changeRadio(e){
    let value = e.detail;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })
    console.log(this.data.configList)
  },



  /**多选题 */
  onCheckChange(e){
    let value = e.detail;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })
    console.log(this.data.configList)
  },


  /**下拉值 */
  pullChange(e){
    let value = e.detail.value;
    console.log(e)
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })
    console.log(this.data.configList)
  },




  /**显示更多的文字 */
  showMoreFont(){
    this.setData({
      isShowDetailBtn:false,
      isShouShow:true
    })
  },
  /**文字收起 */
  shouFont(){
    this.setData({
      isShowDetailBtn:true,
      isShouShow:false
    })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  showTip(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      companyName:{
        required:true
      },
      name: {
        required:true,
        maxlength:15
      },
      idNo:{
        required:true,
        maxlength:20
      },
      Tel:{
        required:true,
        maxlength:11
      },
      showPosition:{
        required:true
      },
      detailPosition:{
        required:true,
        maxlength:30
      },
      ymjz:{
        required:true
      },
      colorJ:{
        required:true
      },
      fileList:{
        required:true
      },
      fileList1:{
        required:true
      }
    }
    const messages = {
      companyName:{
        required:'企业名称必填'
      },
      name: {
        required:'填报人姓名必填',
        maxlength:'填报人姓名最长15个字符'
      },
      idNo:{
        required:"身份证号码必填",
        maxlength:'身份证号码最长20个字符'
      },
      Tel:{
        required:'联系电话必填',
        maxlength:'联系电话最长11字符'
      },
      showPosition:{
        required:'居住地区必填'
      },
      detailPosition:{
        required:"详细地址必填",
        maxlength:"详细地址最长30字符"
      },
      ymjz:{
        required:"疫苗接种必填"
      },
      colorJ:{
        required:"健康码颜色必填"
      },
      fileList:{
        required:"健康码没有上传",
      },
      fileList1:{
        required:"行程码没有上传",
      },

    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  isRequired(value,name){
    if(!value){
      return name+"必填"
    }
  },
  /**表單驗證與提交 */

  formSubmit(e){

    // let obj={
    //   ...e.detail.value,
    //   showPosition:this.data.form.showPosition,
    //   ymjz:this.data.form.ymjz,
    //   colorJ:this.data.form.colorJ
    // }

    // //校验表单
    // if (!this.WxValidate.checkForm(obj)) {
    //   const error = this.WxValidate.errorList[0]
    //   this.showModal(error)
    //   return false
    // }
    // this.showModal({
    //   msg: '提交成功'
    // })




    /**改成动态的 */
    let dataSum= this.data.configList;
    let errorArr=[]

    /**校验 */
    for(let i=0;i<dataSum.length;i++){
      let item = dataSum[i];
      if(item.isRequired=='1'){
        let msg = this.isRequired(item.value,item.questionName)
        if(msg){
          errorArr.push(msg)
        }
      }
    }
    if(errorArr.length!=0){
      this.showTip(errorArr[0])
      return false
    }

    let answerList=[];
    dataSum.forEach(item=>{
       let obj={}
       obj.questionId=item.id;
        /**若果是多选题转字符串*/
       if(item.declarationSubject== 'multiple_choice'){
         obj.answer=item.value.join(',')

       }else if(item.declarationSubject== 0){
          obj.uploadFile={
            fileName:item.value[0].fileName,
            filePath:item.value[0].filePath,
          }
       }else if(item.declarationSubject== 'pull_down'){
         let value = parseInt(item.value);
          obj.answer=item.questionnaireItems[value].id
       }else{
         obj.answer = item.value;
       }
       answerList.push(obj)
    })
    let submitObj={
        id:this.data.id,
        answerList:answerList
    }



    let that = this;
    let {lock} = that.data;
    if(!lock){
        that.setData({lock:true});
        homeInform.$submitFy(submitObj).then((res)=>{
          if(res.code===1){

            wx.showToast({
              title: '征集成功',
              icon: 'success',
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              });
            },1000)

          }else{
            wx.showToast({
              title: res.message,
              icon: 'error'
            })
            setTimeout(()=>{
              that.setData({lock:false});
            },1000)

          }
      })

    }


    /**动态的修改结束 */

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
