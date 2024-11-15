import request from '@/utils/request'

// 列表
export function getErplogisticsList(data) {
  return request({
    url: 'xnkj/base/erplogistics/erplogisticsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editErplogistics(data) {
  return request({
    url: 'xnkj/base/erplogistics/editErplogistics',
    method: 'post',
    data: data
  })
}

// 添加
export function addErplogistics(data) {
  return request({
    url: 'xnkj/base/erplogistics/addErplogistics',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableErplogistics(data) {
  return request({
    url: 'xnkj/base/erplogistics/disableErplogistics',
    method: 'post',
    data: data
  })
}

// 导入
export function importErplogistics(data) {
  return request({
    url: 'xnkj/base/erplogistics/importErplogistics',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportErplogistics(data) {
  return request({
    url: 'xnkj/base/erplogistics/exportErplogistics',
    method: 'post',
    data: data
  })
}
