import request from '@/utils/request'

// 列表
export function getOnlineorderList(data) {
  return request({
    url: 'xnkj/order/onlineorder/onlineorderList',
    method: 'post',
    data: data
  })
}

// 同步
export function synchOnlineorder(data) {
  return request({
    url: 'xnkj/order/onlineorder/synchOnlineorder',
    method: 'post',
    data: data
  })
}

// 审核
export function toSaleorder(data) {
  return request({
    url: 'xnkj/order/onlineorder/toSaleorder',
    method: 'post',
    data: data
  })
}

// 导出
export function exportOnlineorder(data) {
  return request({
    url: 'xnkj/order/onlineorder/exportOnlineorder',
    method: 'post',
    data: data
  })
}


// 获取订单信息
export function getOrderInfo(data) {
  return request({
    url: 'xnkj/order/onlineorder/getOrderInfo',
    method: 'post',
    data: data
  })
}


// 接转回传平台
export function returnPlatformTime(data) {
  return request({
    url: 'xnkj/order/onlineorder/returnPlatformTime',
    method: 'post',
    data: data
  })
}

