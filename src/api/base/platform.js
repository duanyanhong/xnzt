import request from '@/utils/request'

// 获取销售平台列表
export function getPlatformList(data) {
  return request({
    url: 'xnkj/base/platform/platformList',
    method: 'post',
    data: data
  })
}

// 修改销售平台
export function editPlatform(data) {
  return request({
    url: 'xnkj/base/platform/editPlatform',
    method: 'post',
    data: data
  })
}

// 添加销售平台
export function addPlatform(data) {
  return request({
    url: 'xnkj/base/platform/addPlatform',
    method: 'post',
    data: data
  })
}

// 禁用销售平台
export function disablePlatform(data) {
  return request({
    url: 'xnkj/base/platform/disablePlatform',
    method: 'post',
    data: data
  })
}

