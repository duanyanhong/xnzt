import request from '@/utils/request'

// 列表
export function getSaleorderList(data) {
  return request({
    url: 'xnkj/order/saleorder/saleorderList',
    method: 'post',
    data: data
  })
}

// 设置列
export function setViewfield(data) {
  return request({
    url: 'xnkj/order/saleorder/setViewfield',
    method: 'post',
    data: data
  })
}

// 设置筛选
export function setSearchfield(data) {
  return request({
    url: 'xnkj/order/saleorder/setSearchfield',
    method: 'post',
    data: data
  })
}

// 审核
export function toSaleorder(data) {
  return request({
    url: 'xnkj/order/saleorder/toSaleorder',
    method: 'post',
    data: data
  })
}


// 店铺
export function getShop(data) {
  return request({
    url: 'xnkj/order/saleorder/getShop',
    method: 'post',
    data: data
  })
}

// 逻辑仓库
export function getLogicwarehouse(data) {
  return request({
    url: 'xnkj/order/saleorder/getLogicwarehouse',
    method: 'post',
    data: data
  })
}

export function initShop(data) {
  return request({
    url: 'xnkj/order/saleorder/initShop',
    method: 'post',
    data: data
  })
}
export function getArea(data) {
  return request({
    url: 'xnkj/order/saleorder/getArea',
    method: 'post',
    data: data
  })
}
export function initLogicwarehouse(data) {
  return request({
    url: 'xnkj/order/saleorder/initLogicwarehouse',
    method: 'post',
    data: data
  })
}
export function initPca(data) {
  return request({
    url: 'xnkj/order/saleorder/initCityArea',
    method: 'post',
    data: data
  })
}
export function getCity(data) {
  return request({
    url: 'xnkj/order/saleorder/getCity',
    method: 'post',
    data: data
  })
}

export function addGroupsearch(data) {
  return request({
    url: 'xnkj/order/saleorder/addGroupsearch',
    method: 'post',
    data: data
  })
}

export function editGroupsearch(data) {
  return request({
    url: 'xnkj/order/saleorder/editGroupsearch',
    method: 'post',
    data: data
  })
}

export function deleteGroupsearch(data) {
  return request({
    url: 'xnkj/order/saleorder/deleteGroupsearch',
    method: 'post',
    data: data
  })
}

export function getOrderInfo(data) {
  return request({
    url: 'xnkj/order/saleorder/getOrderInfo',
    method: 'post',
    data: data
  })
}

export function editBase(data) {
  return request({
    url: 'xnkj/order/saleorder/editBase',
    method: 'post',
    data: data
  })
}
// 获取替换商品数据
export function getItem(data) {
  return request({
    url: 'xnkj/order/saleorder/getItem',
    method: 'post',
    data: data
  })
}

// 获取替换商品提交保存
export function replaceSku(data) {
  return request({
    url: 'xnkj/order/saleorder/replaceSku',
    method: 'post',
    data: data
  })
}

// 明细里面基本信息根据城配商查询站点信息
export function getSites(data) {
  return request({
    url: 'xnkj/order/saleorder/getSite',
    method: 'post',
    data: data
  })
}
// 明细里面基本信息修改保存
export function updateBase(data) {
  return request({
    url: 'xnkj/order/saleorder/updateBase',
    method: 'post',
    data: data
  })
}

// 明细里面收件信息修改保存
export function updateReceiver(data) {
  return request({
    url: 'xnkj/order/saleorder/updateReceiver',
    method: 'post',
    data: data
  })
}

// 明细里面备注信息修改保存
export function updateDesc(data) {
  return request({
    url: 'xnkj/order/saleorder/updateDesc',
    method: 'post',
    data: data
  })
}

// 锁定提交
export function lockSaleorder(data) {
  return request({
    url: 'xnkj/order/saleorder/lockSaleorder',
    method: 'post',
    data: data
  })
}

// 解锁
export function unlockSaleorder(data) {
  return request({
    url: 'xnkj/order/saleorder/unlockSaleorder',
    method: 'post',
    data: data
  })
}
// 审核
export function toOutorder(data) {
  return request({
    url: 'xnkj/order/saleorder/toOutorder',
    method: 'post',
    data: data
  })
}
// 导出订单
export function exportSaleorder(data) {
  return request({
    url: 'xnkj/order/saleorder/exportSaleorder',
    method: 'post',
    data: data
  })
}
// 导出明细
export function exportSaleorderDetail(data) {
  return request({
    url: 'xnkj/order/saleorder/exportSaleorderDetail',
    method: 'post',
    data: data
  })
}
// 拦截
export function interceptSaleorder(data) {
  return request({
    url: 'xnkj/order/saleorder/interceptSaleorder',
    method: 'post',
    data: data
  })
}

// 出库回传平台
export function returnPlatform(data) {
  return request({
    url: 'xnkj/order/saleorder/returnPlatform',
    method: 'post',
    data: data
  })
}















