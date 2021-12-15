import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

const baseUrl = Conf.baseUrl;
export default {
   // 获取活动详情内容
   $getActivitiesContent: function(id) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/activities/getClobByLinkId.action',{id: id});
  },
  // 获取字典 接口
  $getDictList: function(groupKey) {
    return HttpUtil.wxRequest('get', {}, Conf.httpUrl.getDict, {groupKey: groupKey});
  },
  // 获取活动列表
  $getActivitiesList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/activities/getPage.action', data);
  },
  // 获取活动详情
  $getActivitiesDetail: function(id) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/activities/getDetail.action', {id: id});
  },
  // 活动报名
  $signUp: function(id) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/activities/signUp.action', {id:id});
  },
  // 活动取消报名
  $quXiaoSignUp:function(id){
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/activities/cancelSignUp.action', {id:id});
  },
  // 获取资讯列表
  $getInformationList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/information/getPage.action', data);
  },
  // 获取资讯详情
  $getInformationDetail: function(id) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/information/getDetail.action', {id: id});
  },

  // 获取三级链
  $getSanLian:function(){
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/epidemicPrevention/getAddress.action');
  }
};
