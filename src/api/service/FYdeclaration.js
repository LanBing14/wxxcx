/**防疫申报 */
import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';
export default {
    // 防疫申报列表
    $getInformList: function(data = {}) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/epidemicPrevention/getEpidemicPreventionList.action', data);
    },

    // 防疫详情
    $getFyDetail:function(id) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/epidemicPrevention/getEpidemicPreventionDetail.action?',id);
    },
    // 防疫提交
    $submitFy:function(data) {
      return HttpUtil.wxRequest('post', {}, Conf.baseUrl+'mini/epidemicPrevention/saveEpidemicPrevention.action?',data);
    }

}