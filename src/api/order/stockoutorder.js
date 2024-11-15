import request from '@/utils/request'

// 列表
export function getStokoutorderList(data) {
  return request({
    url: 'xnkj/order/deliveryorder/deliveryorderList',
    method: 'post',
    data: data
  })
}

// 导出
export function exportStockoutorder(data) {
  return request({
    url: 'xnkj/order/deliveryorder/exportDeliveryorder',
    method: 'post',
    data: data
  })
}

// 导出
export function exportStockoutorderDetail(data) {
  return request({
    url: 'xnkj/order/deliveryorder/exportDeliveryorderDetail',
    method: 'post',
    data: data
  })
}

// 设置列
export function setViewfield(data) {
  return request({
    url: 'xnkj/order/deliveryorder/setViewfield',
    method: 'post',
    data: data
  })
}

// 设置筛选
export function setSearchfield(data) {
  return request({
    url: 'xnkj/order/deliveryorder/setSearchfield',
    method: 'post',
    data: data
  })
}


// 店铺
export function getShop(data) {
  return request({
    url: 'xnkj/order/deliveryorder/getShop',
    method: 'post',
    data: data
  })
}

// 逻辑仓库
export function getLogicwarehouse(data) {
  return request({
    url: 'xnkj/order/deliveryorder/getLogicwarehouse',
    method: 'post',
    data: data
  })
}

export function initShop(data) {
  return request({
    url: 'xnkj/order/deliveryorder/initShop',
    method: 'post',
    data: data
  })
}
export function getArea(data) {
  return request({
    url: 'xnkj/order/deliveryorder/getArea',
    method: 'post',
    data: data
  })
}
export function initLogicwarehouse(data) {
  return request({
    url: 'xnkj/order/deliveryorder/initLogicwarehouse',
    method: 'post',
    data: data
  })
}
export function initPca(data) {
  return request({
    url: 'xnkj/order/deliveryorder/initCityArea',
    method: 'post',
    data: data
  })
}
export function getCity(data) {
  return request({
    url: 'xnkj/order/deliveryorder/getCity',
    method: 'post',
    data: data
  })
}

export function addGroupsearch(data) {
  return request({
    url: 'xnkj/order/deliveryorder/addGroupsearch',
    method: 'post',
    data: data
  })
}

export function editGroupsearch(data) {
  return request({
    url: 'xnkj/order/deliveryorder/editGroupsearch',
    method: 'post',
    data: data
  })
}

export function deleteGroupsearch(data) {
  return request({
    url: 'xnkj/order/deliveryorder/deleteGroupsearch',
    method: 'post',
    data: data
  })
}

export function getOrderInfo(data) {
  return request({
    url: 'xnkj/order/deliveryorder/getOrderInfo',
    method: 'post',
    data: data
  })
}




