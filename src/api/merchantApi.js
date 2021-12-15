import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

export default {
  // 获取信易加服务分详情 接口
  $getServiceMark: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getServiceMark.action', data);
  },

  // 获取 接口
  $getJyxx: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getJyxx.action', data);
  },

  // 获取商户管理-兑换记录列表 接口
  $getShglSpdhList: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getShglSpdhList.action', data);
  },

  // 获取商户管理-服务记录列表 接口
  $getShglFkjlList: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getShglFkjlList.action', data);
  },

  // 服务授权列表 接口
  $getAuthList: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getAuthList.action', data);
  },

  // 服务授权删除 接口
  $deleteAuth: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/deleteAuth.action', data);
  },

  // 服务授权新增 接口
  $addAuth: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/addAuth.action', data);
  },

  // 兑换记录详情 接口
  $getShglSpdhDetail: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getShglSpdhDetail.action', data);
  },

  // 服务记录详情 接口
  $getShglFkjlDetail: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/getShglFkjlDetail.action', data);
  },

  // 生成门牌 接口
  $genCxmp: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/genCxmp.action', data);
  },

  // 修改履约状态 接口
  $changeLyzt: function (data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl + 'merchant/changeLyzt.action', data);
  },

};
