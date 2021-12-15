import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';

export default {
  // 通知提醒列表 接口
  $getInformList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/list.action', data);
  },
  // 改变数据状态
  $getchangeStatue: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/changeStatue.action', data);
  },
  // 二维码
  $getQR: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/getQR.action', data);
  }
}