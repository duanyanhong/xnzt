import request from '@/utils/request'

// 列表
export function getOutscopeList(data) {
  return request({
    url: 'xnkj/base/outscope/outscopeList',
    method: 'post',
    data: data
  })
}

// 映射
export function outscopeMatch(data) {
  return request({
    url: 'xnkj/base/outscope/outscopeMatch',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteOutscope(data) {
  return request({
    url: 'xnkj/base/outscope/deleteOutscope',
    method: 'post',
    data: data
  })
}

// 省
export function getProvince(data) {
  return request({
    url: 'xnkj/base/outscope/getProvince',
    method: 'post',
    data: data
  })
}

// 市
export function getCity(data) {
  return request({
    url: 'xnkj/base/outscope/getCity',
    method: 'post',
    data: data
  })
}

// 区
export function getArea(data) {
  return request({
    url: 'xnkj/base/outscope/getArea',
    method: 'post',
    data: data
  })
}

