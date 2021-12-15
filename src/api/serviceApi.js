import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

const baseUrl = Conf.baseUrl;
export default {
  // 获取字典 接口
  $getDictList: function(groupKey) {
    return HttpUtil.wxRequest('get', {}, Conf.httpUrl.getDict, {groupKey: groupKey});
  },
  // 获取征集信息列表
  $getDeclarationList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/informationDeclaration/getDeclarationList.action', data);
  },
  // 获取征集信息详情
  $getInformationInfo: function(id, declarationId) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'mini/informationDeclaration/getInformationInfo.action', {id: id, declarationId: declarationId});
  },
  // 征集信息提交
  $submitDeclaration: function(data = {}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'mini/informationDeclaration/submit.action', data);
  },
};
