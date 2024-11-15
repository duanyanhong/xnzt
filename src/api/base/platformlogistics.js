import request from '@/utils/request'

// 列表
export function getPlatformlogisticsList(data) {
  return request({
    url: 'xnkj/base/platformlogistics/platformlogisticsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editPlatformlogistics(data) {
  return request({
    url: 'xnkj/base/platformlogistics/editPlatformlogistics',
    method: 'post',
    data: data
  })
}

// 添加
export function addPlatformlogistics(data) {
  return request({
    url: 'xnkj/base/platformlogistics/addPlatformlogistics',
    method: 'post',
    data: data
  })
}

// 禁用
export function disablePlatformlogistics(data) {
  return request({
    url: 'xnkj/base/platformlogistics/disablePlatformlogistics',
    method: 'post',
    data: data
  })
}

// 导入
export function importPlatformlogistics(data) {
  return request({
    url: 'xnkj/base/platformlogistics/importPlatformlogistics',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportPlatformlogistics(data) {
  return request({
    url: 'xnkj/base/platformlogistics/exportPlatformlogistics',
    method: 'post',
    data: data
  })
}
