// pages/service/components/houseSources.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    hasChoosed:{
      type:[String,Array],
      default:''
    },
    roomList:{
      type:Array,
      default:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    /**选择的房间 */
    chooseRoomsArr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**选择房间的组件被点击 */
    onmyclick(e){
      console.log(e.detail)
    },
    /**得到选择的房间 */
    getRooms(e){

      let arr= this.data.hasChoosed? [...this.data.hasChoosed]:[...this.data.chooseRoomsArr];

      let index = arr.findIndex(item=>item.id==e.detail.id)
      if(index!=-1){
        arr.splice(index,1)
      }else{
        arr.push(e.detail)
      }
     
      this.setData({
        chooseRoomsArr:[...arr],
        hasChoosed:[...arr]
      })
      console.log(this.data)
    },

    //  /**将选择好的房间传给父组件 */
     backAndSendRooms(){
       let chuanArr = this.data.hasChoosed? this.data.hasChoosed:this.data.chooseRoomsArr
       this.triggerEvent("getR",chuanArr)
     },

     selfBack(){
       this.triggerEvent("hideHouseSources")
     }
  }
})
