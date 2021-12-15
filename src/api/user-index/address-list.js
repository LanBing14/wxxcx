import HttpUtil from '../../utils/httpUtil';
import Conf from '../../config/conf';

export default {
  // 通讯录列表 接口
  $getAddressBook: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/addressBook.action', data);
  },
  // 通讯录 邀请部门
  $getDepartment: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/getDepartment.action', data);
  },
  // 发送邀请码
  $saveUser: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/saveUser.action', data);
  },
  // 通讯录 通过 驳回
  $changeAccountStatue: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/changeAccountStatue.action', data);
  },
  
}