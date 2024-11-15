import request from '@/utils/request'

// 列表
export function getPlatformscopeList(data) {
  return request({
    url: 'xnkj/base/platformscope/platformscopeList',
    method: 'post',
    data: data
  })
}

// 添加
export function addPlatformscope(data) {
  return request({
    url: 'xnkj/base/platformscope/addPlatformscope',
    method: 'post',
    data: data
  })
}

// 禁用
export function disablePlatformscope(data) {
  return request({
    url: 'xnkj/base/platformscope/disablePlatformscope',
    method: 'post',
    data: data
  })
}

// 删除
export function deletePlatformscope(data) {
  return request({
    url: 'xnkj/base/platformscope/deletePlatformscope',
    method: 'post',
    data: data
  })
}

// 取消
export function cancelScope(data) {
  return request({
    url: 'xnkj/base/platformscope/cancelScope',
    method: 'post',
    data: data
  })
}

// 导入
export function importPlatformscope(data) {
  return request({
    url: 'xnkj/base/platformscope/importPlatformscope',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportPlatformscope(data) {
  return request({
    url: 'xnkj/base/platformscope/exportPlatformscope',
    method: 'post',
    data: data
  })
}

//省份
export function getProvince(data) {
  return request({
    url: 'xnkj/base/platformscope/getProvince',
    method: 'post',
    data: data
  })
}

//城市
export function getCity(data) {
  return request({
    url: 'xnkj/base/platformscope/getCity',
    method: 'post',
    data: data
  })
}

//详情
export function scopeDetail(data) {
  return request({
    url: 'xnkj/base/platformscope/scopeDetail',
    method: 'post',
    data: data
  })
}
