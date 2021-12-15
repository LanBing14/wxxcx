import WxValidate from '../../../utils/WxValidate.js'
import repeairApi from '../../../api/service/propertyRepair.js';
const app = getApp();
Page({
  data:{
    /**文本框的值 */
    /**文本框的值 */
    form:{  
      content: ''
    },
    /**房源 */
    roomsData:'',
    rommsNameStr:'',
    roomsIdStr:'',
    /**园区是不是显示 */
    isParkShow:false,

    /**房源是不是显示 */
    isRoomShow:false,
    getParkValue:'',
    /**上传图片 */
    fileList: [],
    /**房源列表数组对象 */
    roomList:[],
    totalArea:0,
    lock: false // 防止页面的按钮重复点击
  },
  // 修改内容
  changeContent(e){
    this.setData({
      ["form.content"]:e.detail.value
    })
  },
  // /**获得选中的房间的数据*/
  getRr(e){

    this.setData({
      roomsData:e.detail,
      totalArea:0
    })

    /**关闭房间 */
    this.setData({
      isParkShow:false,
      isRoomShow:false
    })

  
    /**将选择的房间转化成字符串 */
    let arrR=this.data.roomsData;
    /**求面积 */
    let to=0;
    
     arrR.forEach(item=>{
       to+=item.area
     })
  
    this.setData({
      totalArea:to
    })

    let roomS=[]
    let roomId=[]
    arrR.forEach(item=>{
      roomS.push(item.name)
      roomId.push(item.id)
    })

    this.setData({
      rommsNameStr:roomS.join(","),
      roomsIdStr:roomId.join(",")
    })

  
     
  },

  //获取当前园区
  getCurrentPark(){
    repeairApi.$getCurrentInfo().then(res=>{
      if(res.code==1){
        if(res.result.id){
          let obj={
            ID:res.result.id,
            label:res.result.buildName
          }
          this.setData({
            getParkValue:obj
          })
        }
      }
        
    })
  },


  /**隐藏房间选择 */
  hideHouse(){
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
           item['area'] =item.ROOM_AREA;
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
      textareaAValue: e.detail.value
    })
  },
 
  onLoad() {
   
    this.initValidate()//验证规则函数
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
        required:'装修房源必填'
      },
      content: {
        required:'请填写报修内容',
        maxlength:'报修内容最长200个字符'
      }
      
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  
  formSubmit(e){
    let obj={rommsNameStr:this.data.rommsNameStr,...e.detail.value}

    //校验表单
    if (!this.WxValidate.checkForm(obj)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    };
    let subObj ={
      decorationContent:this.data.form.content,
      decorationArea:this.data.totalArea,
      houseIds:this.data.roomsIdStr
    }

    let that = this;
    let {lock} = that.data;

    if(!lock){
      that.setData({lock:true});
      repeairApi.$submitZhuangInfo(subObj).then(res=>{
        if(res.code==1){
            wx.showToast({
              title: '装修提交成功',
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
  }
});