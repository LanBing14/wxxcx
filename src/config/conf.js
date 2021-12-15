// 开发
// const host = 'http://192.168.20.115:8080/zxyc_park_war_exploded/';

const host = 'http://192.168.20.73:8084/';
const ws = 'ws://192.168.20.84:8082/xyj';
// const host = 'https://zxyc.citgc.com/';
// const ws = 'ws://192.168.20.111:8081/xyj';
// 测试
// const host = 'http://10.191.30.251:5118/creditService-xyj';
// const ws = 'ws://10.191.30.251:5118/creditService-xyj';
// 正式
// const host = 'http://192.168.20.171:8099/creditService_xyj_war_exploded';
// const ws = 'ws://192.168.20.171:8099/creditService_xyj_war_exploded';
export default {
  // 复制链接查看
   copyUrl:`http://qyd.udatech.com:3340/applyOther?modelId=`,
  
  baseUrl: `${host}`,
  // 远程图片访问地址
  imagesUrl: `${host}` + 'creditCommon/viewImg.action?path=',
  // socket接口
  socketUrl: `${ws}` + `websocket/`,
  // 获取字典接口
  getDict: `${host}` + `common/getDictByGroupKey.action`,
  httpUrl: {
    uploadFile: `${host}` + `creditCommon/ajaxFileUpload.action`,
    // 预览接口
    viewFile: `${host}` + `creditCommon/viewImg.action`,
    // 获取字典接口
    getDict: `${host}` + `common/getDictByGroupKey.action`
  }
};
