/**报修 */
import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';
export default {
    // 获取房间列表
    $getRoomList: function(parkId) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/property/getRoom.action', parkId);
    },
    // 获取当前园区信息
    $getCurrentInfo: function() {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/authentication/getAuthentication.action');
    },
    // 获取当前园区信息
    $getParkUser: function() {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/getUserPark.action');
    },
    // 提交信息
    $submitRepairInfo:function(data){
      return HttpUtil.wxRequest('post', {}, Conf.baseUrl+'mini/property/saveRepair.action',data);
    },
    $submitZhuangInfo:function(data){
      return HttpUtil.wxRequest('post', {}, Conf.baseUrl+'mini/property/saveDecoration.action',data);
    }
    
}
