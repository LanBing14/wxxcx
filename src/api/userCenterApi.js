import HttpUtil from '../utils/httpUtil';
import userCenterConf from '../config/userCenterConf';
import Conf from '../config/conf';

const baseUrl = Conf.baseUrl;
export default {
  // 测试
  $serviceStatisticsList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, userCenterConf.serviceStatisticsList);
  },
  $wxLogin: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, userCenterConf.wxLogin, data);
  },
  $isLogin: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, userCenterConf.isLogin, data);
  },
  // 解密小程序用户敏感数据,并登录
  $decodeUserInfo: function(encryptedData, iv, nickname) {
    return HttpUtil.wxRequest('post', {}, userCenterConf.decodeUserInfo, {encryptedData: encryptedData, iv: iv, nickname: nickname});
  },
  // 保存头像
  $saveHead: function(data={}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'mini/oauth/save/head.action?path='+data, {});
  },

  // 保存姓名
  $saveName: function(data={}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'mini/oauth/save/name.action', {...data});
  },
  
};
