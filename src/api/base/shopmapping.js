import request from '@/utils/request'

// 获取店铺映射列表
export function getShopmappingList(data) {
  return request({
    url: 'xnkj/base/shopmap/shopmapList',
    method: 'post',
    data: data
  })
}

// 修改店铺映射
export function editShopmapping(data) {
  return request({
    url: 'xnkj/base/shopmap/editShopmap',
    method: 'post',
    data: data
  })
}

// 添加店铺映射
export function addShopmapping(data) {
  return request({
    url: 'xnkj/base/shopmap/addShopmap',
    method: 'post',
    data: data
  })
}

// 禁用店铺映射
export function disableShopmapping(data) {
  return request({
    url: 'xnkj/base/shopmap/disableShopmap',
    method: 'post',
    data: data
  })
}

// 导入
export function importShopmapping(data) {
  return request({
    url: 'xnkj/base/shopmap/importShopmap',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportShopmapping(data) {
  return request({
    url: 'xnkj/base/shopmap/exportShopmap',
    method: 'post',
    data: data
  })
}
