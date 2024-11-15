import request from '@/utils/request'

// 列表
export function getScopeList(data) {
  return request({
    url: 'xnkj/base/scope/scopeList',
    method: 'post',
    data: data
  })
}

// 添加
export function addScope(data) {
  return request({
    url: 'xnkj/base/scope/addScope',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableScope(data) {
  return request({
    url: 'xnkj/base/scope/disableScope',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteScope(data) {
  return request({
    url: 'xnkj/base/scope/deleteScope',
    method: 'post',
    data: data
  })
}

// 导入
export function importScope(data) {
  return request({
    url: 'xnkj/base/scope/importScope',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportScope(data) {
  return request({
    url: 'xnkj/base/scope/exportScope',
    method: 'post',
    data: data
  })
}

//省份
export function getProvince() {
  const accessToken = sessionStorage.getItem('xn_token')
  return request({
    url: 'xnkj/base/scope/getProvince',
    method: 'post',
    data: {
      accessToken
    }
  })
}

//城市
export function getCity(data) {
  return request({
    url: 'xnkj/base/scope/getCity',
    method: 'post',
    data: data
  })
}

//详情
export function platformscopeDetail(data) {
  return request({
    url: 'xnkj/base/scope/platformscopeDetail',
    method: 'post',
    data: data
  })
}
