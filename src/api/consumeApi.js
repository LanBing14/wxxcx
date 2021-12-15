import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

export default {
  // 消费记录列表 接口
  $getConsumeRecordList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'consumeRecord/getPage.action', data);
  },

  // 消费记录详情 接口
  $getConsumeRecordDetail: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'consumeRecord/detail.action', data);
  },

  // 评价 接口
  $consumeEvaluate: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'consumeRecord/evaluate.action', data);
  }
};
