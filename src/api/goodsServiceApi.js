import HttpUtil from '../utils/httpUtil';
import Conf from '../config/conf';

const baseUrl = Conf.baseUrl;
export default {
  // 获取字典 接口
  $getDictList: function(groupKey) {
    return HttpUtil.wxRequest('get', {}, Conf.httpUrl.getDict, {groupKey: groupKey});
  },
  // 获取 当前信用币、已消耗信用币 数量
  $getXybNumber: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'xyb/getXybNumber.action', data);
  },
  // 获取 某个月的信用币记录列表
  $getXybByDate: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'xyb/getXybByDate.action', data);
  },
  //获取 信用币规则
  $getXybRule: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'xyb/getXybRule.action', data);
  },
  // 获取所属区域
  $getArea: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getArea.action', data);
  },
  // 获取商品类别
  $getGoodsType: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getGoodsType.action', data);
  },
  // 获取商品列表
  $getGoodsList: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getGoodsList.action', data);
  },
  // 获取商品详情
  $getGoodsDetail: function(id) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getGoodsDetail.action', {id: id});
  },
  // 获取商品兑换数量
  $getExchangeCount: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getExchangeCount.action', data);
  },
  // 兑换商品,生成兑换记录
  $saveExchange: function(data = {}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'goods/saveExchange.action', data);
  },
  // 获取当前用户的服务机构信息
  $getServiceDept: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'serve/getServiceDept.action', data);
  },
  // 获取服务机构下的所有服务
  $getServiceManagerList: function(serviceDeptId) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'serve/getServiceManagerList.action', {serviceDeptId: serviceDeptId});
  },
  // 获取服务详情
  $getServiceDetail: function(serviceManagerId) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'serve/getServiceDetail.action', {serviceManagerId: serviceManagerId});
  },
  // 新增或编辑服务
  $saveService: function(data = {}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'serve/saveService.action', data);
  },
  // 启用/禁用 服务
  $enableService: function(serviceManagerId, status) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'serve/enable.action', {serviceManagerId: serviceManagerId, status: status});
  },
  // 删除服务
  $deleteService: function(serviceManagerId) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'serve/delete.action', {serviceManagerId: serviceManagerId});
  },
  // 获取该服务下商品列表
  $getServiceGoods: function(data = {}) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/getServiceGoods.action', data);
  },
  // 新增或编辑商品
  $saveGoods: function(data = {}) {
    return HttpUtil.wxRequest('post', {}, baseUrl + 'goods/saveGoods.action', data);
  },
  // 上架、下架商品
  $sjxjGoods: function(spxxId, status) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/sjxjGoods.action', {spxxId: spxxId, status: status});
  },
  // 删除商品
  $deleteGoods: function(spxxId) {
    return HttpUtil.wxRequest('get', {}, baseUrl + 'goods/deleteGoods.action', {spxxId: spxxId});
  },
};
