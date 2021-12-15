import Conf from './conf';

export default {
  // 公共接口
  common: Conf,
  // 解密用户手机号登录 接口
  decodeUserInfo: Conf.baseUrl + `mini/oauth/decodeUserInfo.action`,
  // 微信授权登录 接口
  wxLogin: Conf.baseUrl + `mini/oauth/wxLogin.action`,
  // 判断用户是否登录 接口
  isLogin: Conf.baseUrl + `mini/oauth/isLogin.action`,
  // 措施优享 根据字典项查询对应的服务 接口
  serviceStatisticsList: Conf.baseUrl + `mini/demo/ServiceStatisticsList.action`
};
