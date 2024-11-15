import request from '@/utils/request'

// 列表
export function getCarrierList(data) {
  return request({
    url: 'xnkj/base/carrier/carrierList',
    method: 'post',
    data: data
  })
}

// 修改
export function editCarrier(data) {
  return request({
    url: 'xnkj/base/carrier/editCarrier',
    method: 'post',
    data: data
  })
}

// 添加
export function addCarrier(data) {
  return request({
    url: 'xnkj/base/carrier/addCarrier',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableCarrier(data) {
  return request({
    url: 'xnkj/base/carrier/disableCarrier',
    method: 'post',
    data: data
  })
}
