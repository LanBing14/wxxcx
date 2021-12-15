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
    viewImgUrl: getApp().globalData.viewImgUrl,
    /**全部的详情描述 */
    fullDeclarationExplain:'',
    declarationExplain:'',
    /**防疫标题 */
    declarationSubject:'',
    isShowDetailBtn:true,
    isShouShow:false,
    upFile:Conf.httpUrl.uploadFile,
    viewFile:Conf.httpUrl.viewFile,
    /**下面开始动态生成表单 */
    configList:[],
    id:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id= options.id;
    let declarationId = options.declarationId;
      this.setData({
        "id":id
      });

      this.getDetailData({fillId:id, declarationId: declarationId});

  },
  getDetailData(id){
    homeInform.$getFyDetail(id).then((res)=>{
        wx.showLoading({title: '加载中...'});
        if(res.code===1){
          console.log(res,'返回')
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
            declarationSubject:res.result.declaration.declarationSubject
          })
          let configList=res.result.configList

          if(configList.length>0){

              configList.forEach(item=>{
                if(!item['answer']){
                  item['answer']=""
                }
                if(item.declarationSubject=='0'){
                  if(item.questionnaireAnswer&&item.questionnaireAnswer.uploadFile){
                    let uploads=item.questionnaireAnswer.uploadFile;
                    item['answer']=uploads;
                    item['answer']['fullPath'] = this.data.viewFile+'?path='+uploads.filePath;
                    let isImgArr = uploads.filePath.split('.');
                    let isImg='false';

                    if(isImgArr[isImgArr.length-1]=="jpeg"||isImgArr[isImgArr.length-1]=="jpg"||isImgArr[isImgArr.length-1]=="png"){
                      item['answer']['isImg'] = 'true'
                    }else{
                      let fileName=item['answer'].fileName;
                      let hz=fileName.split('.')
                      if(fileName.length>20){
                        item['answer']['fileShortName']=fileName.substring(0,20)+'...'+hz[hz.length-1]

                      }else{
                        item['answer']['fileShortName']=fileName
                      }

                    }

                  }

                }else if(
                  item.declarationSubject=='pull_down'||
                  item.declarationSubject=='multiple_choice'||item.declarationSubject=='single_choice'

                ){
                  item['answer']='';
                  let querAswer=item.questionnaireAnswer.answer.split(',')
                  let querAquestionnaireItems=item.questionnaireItems;
                  let pei={}
                  if(querAquestionnaireItems.length>0){

                    querAquestionnaireItems.forEach(item=>{
                        pei[item.id] = item.itemsName
                    })
                  }

                  if(querAswer.length>0){
                    querAswer.forEach((item2,idx)=>{
                      if(idx!=querAswer.length-1){
                        item['answer']+=pei[item2]+','
                      }else{
                        item['answer']+=pei[item2]
                      }
                    })
                  }

                }else if(item.declarationSubject=='1'||item.declarationSubject=='fill_blank'||item.declarationSubject=='area'){

                  if(!item.questionnaireAnswer){
                    item['answer']=""
                    return
                  }
                  item['answer']=item.questionnaireAnswer.answer
                }
              })
          }


          this.setData({
            configList
          })


          wx.hideLoading();

        }else{
          wx.hideLoading()
        }
    }).catch(err=>{
      wx.hideLoading()
      console.log(err)
    })

  },
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

          }
        });
      },
      fail: function (err) {
        wx.showToast({
          title: '下载失败',
          icon: 'error'
        })

      },
    });
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
