import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

export default {
  $getVisitInfo: (data = {}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/visitInfo/getPage.action`,
       data
    )
  },
  $handelCancel: (data = {}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/visitInfo/cancel.action`,
       data
    )
  },
  //园区list
  $getPark: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/notice/getPark.action`,
       data
    )
  },
  //公司list
  $getCompany: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/notice/getCompany.action`,
       data
    )
  },
  $getDepartment: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/notice/getDepartment.action`,
       data
    )
  },
  $saveAccount: (data ={}) =>{
    return HttpUtil.wxRequest(
      "post",
       {},
      `${Conf.baseUrl}/mini/notice/saveAccount.action`,
       data
    )
  },
  $getUserInfo: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/notice/getUserInfo.action`,
       data
    )
  },
  $getVisitorRegister: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/visitInfo/getDetail.action`,
       data
    )
  },
  //企业认证
  $getAuthentication: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/authentication/getAuthentication.action`,
       data
    )
  },
  //状态
  $changeAccountStatue: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}/mini/notice/changeAccountStatue.action`,
       data
    )
  },
  //部门
  $getDepartmentName: (data ={}) =>{
    return HttpUtil.wxRequest(
      "get",
       {},
      `${Conf.baseUrl}mini/notice/getDepartmentName.action`,
       data
    )
  },
  $getParkUserList: function(key) {
    return HttpUtil.wxRequest('get', {}, Conf.baseUrl+'mini/notice/getUserPark.action', key);
  }
};
