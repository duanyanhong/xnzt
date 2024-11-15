import request from '@/utils/request'

// 获取店铺列表
export function getShopList(data) {
  return request({
    url: 'xnkj/base/shop/shopList',
    method: 'post',
    data: data
  })
}

// 修改店铺
export function editShop(data) {
  return request({
    url: 'xnkj/base/shop/editShop',
    method: 'post',
    data: data
  })
}

// 添加店铺
export function addShop(data) {
  return request({
    url: 'xnkj/base/shop/addShop',
    method: 'post',
    data: data
  })
}

// 禁用店铺
export function disableShop(data) {
  return request({
    url: 'xnkj/base/shop/disableShop',
    method: 'post',
    data: data
  })
}

// 获取部门
export function getDepartment(data) {
  return request({
    url: 'xnkj/base/shop/getDepartment',
    method: 'post',
    data: data
  })
}

// 导入
export function importShop(data) {
  return request({
    url: 'xnkj/base/shop/importShop',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportShop(data) {
  return request({
    url: 'xnkj/base/shop/exportShop',
    method: 'post',
    data: data
  })
}

