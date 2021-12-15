/**防疫申报 */
import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';
export default {
    // 获取园区列表
    $getParkList: function(key) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/property/getPark.action', key);
    },
    $getParkUserList: function(key) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/getUserPark.action', key);
    }
}
