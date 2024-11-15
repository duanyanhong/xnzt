import request from '@/utils/request'

// 获取云仓配置列表
export function getCloudwarehouseList(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/cloudwarehouseList',
    method: 'post',
    data: data
  })
}

// 修改云仓配置
export function editCloudwarehouse(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/editCloudwarehouse',
    method: 'post',
    data: data
  })
}

// 添加云仓配置
export function addCloudwarehouse(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/addCloudwarehouse',
    method: 'post',
    data: data
  })
}

// 禁用云仓配置
export function disableCloudwarehouse(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/disableCloudwarehouse',
    method: 'post',
    data: data
  })
}

// 导入
export function importCloudwarehouse(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/importCloudwarehouse',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportCloudwarehouse(data) {
  return request({
    url: 'xnkj/base/cloudwarehouse/exportCloudwarehouse',
    method: 'post',
    data: data
  })
}
