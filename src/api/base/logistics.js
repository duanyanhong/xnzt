import request from '@/utils/request'

// 获取云仓配置列表
export function getLogisticsList(data) {
  return request({
    url: 'xnkj/base/logistics/logisticsList',
    method: 'post',
    data: data
  })
}

// 修改云仓配置
export function editLogistics(data) {
  return request({
    url: 'xnkj/base/logistics/editLogistics',
    method: 'post',
    data: data
  })
}

// 添加云仓配置
export function addLogistics(data) {
  return request({
    url: 'xnkj/base/logistics/addLogistics',
    method: 'post',
    data: data
  })
}

// 禁用云仓配置
export function disableLogistics(data) {
  return request({
    url: 'xnkj/base/logistics/disableLogistics',
    method: 'post',
    data: data
  })
}

// 导入
export function importLogistics(data) {
  return request({
    url: 'xnkj/base/logistics/importLogistics',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportLogistics(data) {
  return request({
    url: 'xnkj/base/logistics/exportLogistics',
    method: 'post',
    data: data
  })
}
