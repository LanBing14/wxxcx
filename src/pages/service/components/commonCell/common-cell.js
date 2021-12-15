// pages/service/components/commonCell/common-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    idNumber:{
      type:[Number,String],
      default:undefined
    },
    name:{
      type:String,
      default:''
    },
    /**用于回显-已经选中的 */
    hasChoosed:{
      type:[String,Array],
      default:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ischoose:false
  },
  lifetimes: {

    attached: function() {
      
      /**回显 */
      if(Array.isArray(this.data.hasChoosed)&&this.data.hasChoosed.length>0){
        let index= this.data.hasChoosed.findIndex(item=>item.id==this.data.idNumber)
        if(index!=-1){
          this.setData({
            ischoose:true
          })
        }
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseCell(e){
      this.setData({
        ischoose:!this.data.ischoose
      })
      let currentId=e.currentTarget.dataset.id;
      let name = e.currentTarget.dataset.name;
      let eventDetail={
        id:currentId,
        area:8,
        name:name
      }
    
      this.triggerEvent('myevent',eventDetail)
    }
  }
})
