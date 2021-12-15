/**防疫申报 */
import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';
export default {
    // 访客公司选择
    $getCompanyList: function(data) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/visitorRegister/getCompanyList.action', data);
    },

    // 访客信息提交 
    $visitorInfoSubmit:function(data) {
      return HttpUtil.wxRequest('post', {}, Conf.baseUrl+'mini/visitorRegister/add.action',data);
    },

    // 访问事由
    $getReason:function() {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'creditCommon/getDicsByGroupKey.action?groupKey=visit_reason');
    },

    // 获取详情
    $getDetail:function(id) {
      return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/visitorRegister/getDetail.action?',id);
    }
}