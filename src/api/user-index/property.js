import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';

export default {
  // 物业报修 接口
  $getPropertyList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/property/getProperty.action', data);
  },
  // 物业报修详情 接口
  $getPropertyDetail: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/property/getDetail.action', data);
  },
 
}