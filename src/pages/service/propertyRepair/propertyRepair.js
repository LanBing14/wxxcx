import WxValidate from '../../../utils/WxValidate.js'
import Conf from "../../../config/conf.js";
import repeairApi from '../../../api/service/propertyRepair.js';
const app = getApp();
Page({
  data:{
    /**文本框的值 */
    form:{
      content: ''
    },
    upFile:Conf.httpUrl.uploadFile,
    viewFile:Conf.httpUrl.viewFile,
    /**房源 */
    roomsData:'',
    rommsNameStr:'',

    /**园区是不是显示 */
    isParkShow:false,

    /**房源是不是显示 */
    isRoomShow:false,
    getParkValue:'',
    /**上传图片 */
    fileList: [],
    /**房源列表数组对象 */
    roomList:[],

    /**是不是所有的都提交了 */
    isAllImgSubmit:false,

    lock: false // 防止页面的按钮重复点击
  },
  //获取当前园区
  getCurrentPark(){
    repeairApi.$getCurrentInfo().then(res=>{
      if(res.result.id){
        let obj={
          ID:res.result.id,
          label:res.result.buildName
        }
        this.setData({
          getParkValue:obj
        })
      }

    })
  },
  // /**获得选中的房间的数据*/
  getRr(e){
    this.setData({
      roomsData:e.detail
    })

    /**关闭房间 */
    this.setData({
      isParkShow:false,
      isRoomShow:false
    })

    /**将选择的房间转化成字符串 */
    let arrR=e.detail;

    arrR.sort((a,b)=>{
      return a.id - b.id
    })
    let roomS=[]
    e.detail.forEach(item=>{
      roomS.push(item.name)
    })
    this.setData({
      rommsNameStr:roomS.join(",")
    })
  },
  /**隐藏房间选择 */
  hideHouse(){
    this.setData({
      isParkShow:false,
      isRoomShow:false
    })

  },
  /**隐藏园区选择 */
  hidePark(){
    this.setData({
      isParkShow:false,
      isRoomShow:false
    })
  },
  /**显示房源页面 */
  showRoomChoose(){
    if(!this.data.getParkValue){
      this.showModal({msg:"必须先选择所属园区"})
      return false
    }
    this.setData({
      roomList:[]
    })

    this.setData({
      isParkShow:false,
      isRoomShow:true
    })
    let id= this.data.getParkValue.ID;

    repeairApi.$getRoomList({parkId:id}).then(res=>{
      let roomD= res.result;
      let roomData;
      if(roomD.length>0){
        roomData = roomD.map(item=>{
           item['name'] = item.ROOM_NUMBER;
           item['id'] = item.ID;
           return item
        })

        this.setData({
          roomList:roomData
        })
      }

    })

  },

  /** 显示园区页面*/
  showParkChoose(){
    let parkId= this.data.getParkValue.ID? this.data.getParkValue.ID:''

    wx.navigateTo({
      url: '/pages/IndexPages/indexPages?parkId='+parkId
    })

  },
  /**文本框 */
  textareaAInput(e) {
    this.setData({
      ['form.content']: e.detail.value
    })
  },
  /**上传之前做校验 */
  beforeRead(event) {

    const { file, callback } = event.detail;

    let isTrue=file.every(item=>{
        let fileArr=item.url.split(".")
        if(fileArr[fileArr.length-1] === 'jpg'||fileArr[fileArr.length-1] === 'png'){
            return true
        }
    })

    if(isTrue){
      callback(true)
    }else{
      wx.showModal({
          content: '只能选jpg与png格式',
          showCancel: false,
      })
    }

    // let fileArr=file.url.split(".")
    // if(fileArr[fileArr.length-1] === 'jpg'||fileArr[fileArr.length-1] === 'png'){

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
    // }



  },
  /**上传后 */
  afterRead(event) {

    const { file } = event.detail;
    let that = this;
    const uploadTasks=file.map((item,index)=>{
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        return wx.uploadFile({
          url: this.data.upFile, // 仅为示例，非真实的接口地址
          filePath: item.url,
          name: 'files',
          success(res) {
            // 上传完成需要更新 fileList
            const fileList = [...that.data.fileList];
            let url= that.data.viewFile+'?path='+JSON.parse(res.data).success[0].path;
            let fileName = JSON.parse(res.data).success[0].name;

            fileList.push({ ...file, url: url,filePath:JSON.parse(res.data).success[0].path,fileName:fileName });
            that.setData({ fileList });
          },
        });
    })
    Promise.all(uploadTasks).then(()=>{
        this.setData({
          isAllImgSubmit:true
        })
    })
  },




  /**删除文件 */
  deleteFile(e){
    let index=e.detail.index;
    let fileL=[...this.data.fileList];
    fileL.splice(index,1);
    this.setData({
      fileList:fileL
    })
  },

  onLoad() {
    this.initValidate();//验证规则函数
    /**获取当前园区信息 */
    this.getCurrentPark()
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
      rommsNameStr:{
        required:true
      },
      content: {
        required:true,
        maxlength:200
      }

    }
    const messages = {
      rommsNameStr:{
        required:'报修房间必填'
      },
      content: {
        required:'请填写报修内容',
        maxlength:'报修内容最长200个字符'
      }

    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  changeContent(e){
    this.setData({
      ["form.content"]:e.detail.value
    })
  },

  /**表單驗證與提交 */

  formSubmit(e){
    let obj={rommsNameStr:this.data.rommsNameStr,...e.detail.value}

    //校验表单
    if (!this.WxValidate.checkForm(obj)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    };
    let subObj ={
      roomNo:this.data.rommsNameStr,
      contents:this.data.form.content,
      projectId:this.data.getParkValue.ID
    }
    let imgs=[];
    if(this.data.fileList.length>0){
      this.data.fileList.forEach(item=>{
          let o={}
          o['filePath'] = item.filePath;
          o['fileName'] = item.fileName;
          imgs.push(o)
      })
    }else{
      this.setData({
        isAllImgSubmit:true
      })
    }

    subObj['imgs']=imgs;

    if(this.data.isAllImgSubmit){
      let that = this;
      let {lock} = that.data;
      if(!lock){
        that.setData({lock:true});
        repeairApi.$submitRepairInfo(subObj).then(res=>{
          if(res.code==1){
              wx.showToast({
                title: '报修成功',
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
    }else{
      this.showModal({msg:'请等待图片上传完成'})
    }
  }

});
