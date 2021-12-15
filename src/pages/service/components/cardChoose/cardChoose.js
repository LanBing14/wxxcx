Component({
 
    properties: {
     type: {
      type: Number,
      default: 1,
     },
     show: {
      type: Boolean,
      default: false,
     }
    },
    
    data: {
     cityKeyword1: '京沪浙苏粤鲁晋冀豫',
     cityKeyword2: '川渝辽吉黑皖鄂湘赣',
     cityKeyword3: '闽陕甘宁蒙津贵云',
     cityKeyword4: '桂琼青新藏港澳台',
     keyNumber: '1234567890',
     wordList1: 'QWERTYUP港澳',
     wordList2: 'ASDFGHJKL学',
     wordList3: 'ZXCVBNMOI',
    },
    
    methods: {
    /**关闭键盘 */
    closeJP(){

       this.triggerEvent('setTransLate')
     
    },
     handleClick(e) {
      let value = e.currentTarget.dataset.item;
      let type = e.currentTarget.dataset.type;
      switch(value) {
       case 'confirm':
        this.triggerEvent('confirm');
        break;
       case 'delete':
        this.triggerEvent('delete');
        break;
       default: 
        this.triggerEvent('change', { value, type });
      }
     }
    }
   })