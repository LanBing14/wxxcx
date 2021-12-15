// pages/service/SolicitInformationDetail/SolicitInformationDetail.js
import WxValidate from '../../../utils/WxValidate.js'
import ServiceApi from "../../../api/serviceApi";
import Conf from "../../../config/conf";
import serviceCommonApi from "../../../api/parkApi.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appImgUrl:getApp().globalData.appUrl,
    viewImgUrl:getApp().globalData.viewImgUrl,
    id:'',
    /**全部的详情描述 */
    fullDeclarationExplain:'',
    declarationExplain:'',
    /**防疫标题 */
    declarationSubject:'',
    isShowDetailBtn:true,
    isShouShow:false,
    /**附件 */
    uploadFiles:[],
    viewFile: Conf.httpUrl.viewFile,
    upFile:Conf.httpUrl.uploadFile,
    /**这里是选择省市区县 */
    multiArray: [['苏州市'],['吴中区','吴江区'],['越溪街道','华阳街道']],
    multiIndex: [0, 0, 0],
    chinaData: [],
    /**动态数据设置 */
    /**下面开始动态生成表单 */
    configList:[],
    timeshow:false,
    /**动态数据设置结束 */
    /** */
    form:{
      product:'',
      field:"",
      fming:'',
      shouru:'',
      hzxieyi:''
    },
    saveAreaIndex:'',
    lock: false,// 防止页面的按钮重复点击
    dateNowIndex:''
  },
  /**主导产品 */
  changeProduct(event){
    this.setData({
      ['form.product']: event.detail.value,
   })
  },
  /**所属技术领域 */
  changeField(event) {
    this.setData({
       ['form.field']: event.detail,
    })
  },
  /**发明专利等 */
  changeFming(event){
    this.setData({
      ['form.fming']: event.detail.value,
   })
  },
  /**销售收入 */
  changeShouRu(event){
    this.setData({
      ['form.shouru']: event.detail.value,
   })
  },

  // 打开预览
  showFile(tempFilePath,fileType){
    wx.openDocument({
      filePath: tempFilePath,
      fileType:fileType,
      complete:function(e){
        console.log('打开文件---',e)
      }
    })
  },
  downloadImg(e){

    var that = this
    wx.showLoading({
      title:'下载中...'
    })
    let {url} = e.currentTarget.dataset;
    let isImg = url.substring(url.lastIndexOf(".")+1) =='png'||url.substring(url.lastIndexOf(".")+1) =='jpg'||url.substring(url.lastIndexOf(".")+1) =='jpeg'
    let fileType = url.substring(url.lastIndexOf(".")+1)

    wx.downloadFile({
        url:  this.data.viewImgUrl + url,//图片的地址
        header: {
          'content-type': 'application/' + fileType
        },
        filePath: wx.env.USER_DATA_PATH + '/file.' + fileType,
        success:function(res){

          var tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
          wx.hideLoading()

          if( isImg){
            wx.saveImageToPhotosAlbum({
              filePath: res.filePath,  //设置下载图片的地址

              success:function(){
                  wx.showToast({
                    title: '图片保存成功',
                    duration:2000
                  })

              },
              fail(err){
    　　　　　　　　if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
    　　　　　　　　　　wx.showModal({
    　　　　　　　　　　　　title: '提示',
    　　　　　　　　　　　　content: '需要您授权保存相册',
    　　　　　　　　　　　　showCancel: false,
    　　　　　　　　　　　　success: modalSuccess => {
    　　　　　　　　　　　　　　wx.openSetting({
    　　　　　　　　　　　　　　　　success(settingdata) {
    　　　　　　　　　　　　　　　　　　if (settingdata.authSetting['scope.writePhotosAlbum']) {
    　　　　　　　　　　　　　　　　　　　　console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    　　　　　　　　　　　　　　　　　　}else {
    　　　　　　　　　　　　　　　　　　　　console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    　　　　　　　　　　　　　　　　　　}
    　　　　　　　　　　　　　　　　}
    　　　　　　　　　　　　　　})
    　　　　　　　　　　　　}
    　　　　　　　　　　})
    　　　　　　　　}else{
                      wx.showToast({
                        title: '保存失败',
                        icon: 'error',
                        duration:  1000
                        })
                      console.log('保存失败：', err)
                  }
              },
              complete:function(res){
                console.log(res)
              }
          })
          }else{
            that.showFile(res.filePath,fileType)
            wx.saveFile({
              tempFilePath: res.filePath,
              success:function(){
                console.log(  '我保存成功了。。。。。。',e)
                  wx.showToast({
                    title: '文件保存成功',
                    duration:2000
                  })
              }
            })
          }
        },
        complete:function(e){
          wx.hideLoading()
          console.log('cpm',e)
        }
    })
  },

  /**下载文件 */
  downFiles(e){

    let url= this.data.viewFile+"?path="+e.currentTarget.dataset.filepath;
    let arru=url.split('.');

    let fileName = new Date().valueOf();
    let filePath = wx.env.USER_DATA_PATH + '/' + fileName +"."+arru[arru.length-1]

    wx.downloadFile({
      url: url,
      filePath: filePath,
      success: function (res) {

        const tempFilePath = res.filePath;
        // 保存文件
        wx.saveFile({
          tempFilePath,
          success: function (res) {
            const savedFilePath = res.savedFilePath;
            wx.showToast({
              title: '下载成功',
              icon: 'success',
            })
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
            });
          },
          fail: function (err) {
            wx.showToast({
              title: '保存失败',
              icon: 'error'
            })
            console.log('保存失败：', err)
          }
        });
      },
      fail: function (err) {
        wx.showToast({
          title: '下载失败',
          icon: 'error'
        })
        console.log('下载失败：', err);
      },
    });
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initValidate()//验证规则函数

    let id = options.id;
    let declarationId = options.declarationId;
    this.getSolicitInfo(id, declarationId);
    this.getSiteData()
  },
  /**获取详情信息 */
  getSolicitInfo(id, declarationId) {
    ServiceApi.$getInformationInfo(id, declarationId).then((res)=>{
      wx.showLoading({title: '加载中...'});
      if(res.code==1){

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
          uploadFiles:res.result.uploadFiles,
          id:res.result.questionnaireFill.id
        })

        /**动态列表处理 */
        let configList=res.result.configList;
        let newConfig=[]

        if(configList.length>0){
           newConfig = configList.map(item=>{
            item['value'] = "";
            if(item.declarationSubject== 'area'){
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
        wx.hideLoading();
      }else{
        wx.hideLoading();
        wx.showToast({
          title: res.message,
          icon: 'error',
        })
      }


    })
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

  /**填空题 */
  changeInput(e){
    let value = e.detail.value;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })
  },
  beforeRead(event) {
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

  /**单选题 */
  changeRadio(e){
    let value = e.detail;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
    })

  },



  /**多选题 */
  onCheckChange(e){
    let value = e.detail;
    let index= e.currentTarget.dataset.index;
    let item = "configList["+index+"].value";
    this.setData({
      [item]:value
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
  saveQuIndex(e){
    this.setData({
      saveAreaIndex:e.currentTarget.dataset.nowindex
    })
    this.getCity(this.data.saveAreaIndex); // 得到市
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
      this.getZhen(this.data.saveAreaIndex)
    }

  },
  /**复制链接 */
  copyText: function (e) {
    let link = Conf.copyUrl+this.data.id;
    wx.setClipboardData({
      data:link,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
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
        product:{
          required:true,
          maxlength:50
        },
        field:{
          required:true
        },
        fming:{
          required:true,
          maxlength:200
        }
      }
      const messages = {
        product:{
          required:'企业主导产品必填',
          maxlength:'企业主导产品不能超50字符'
        },
        field:{
          required:'所属技术领域必选'
        },
        fming:{
          required:'发明专利等必填',
          maxlength:'发明专利不超200字符'
        }

      }
      this.WxValidate = new WxValidate(rules, messages)
    },

    isRequired(value,name){
      if(!value){
        return name+"必填"
      }
    },
    showTip(msg) {
      wx.showModal({
        content: msg,
        showCancel: false,
      })
    },
    /**表單驗證與提交 */
    formSubmit(e){

      // let obj={
      //   ...e.detail.value,

      //   field:this.data.form.field
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
    /**对this.data.configList做验证 */
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
        ServiceApi.$submitDeclaration(submitObj).then((res)=>{
            if(res.code===1){
              wx.showToast({
                title: '申报成功',
                icon: 'success',
              })
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                });
              },1000)

            }else{
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
