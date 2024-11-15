import request from '@/utils/request'

// 获取网店对接列表
export function getPlatformShopList(data) {
  return request({
    url: 'xnkj/base/platformshop/platformshopList',
    method: 'post',
    data: data
  })
}

// 修改网店对接
export function editPlatformShop(data) {
  return request({
    url: 'xnkj/base/platformshop/editPlatformshop',
    method: 'post',
    data: data
  })
}

// 添加网店对接
export function addPlatformShop(data) {
  return request({
    url: 'xnkj/base/platformshop/addPlatformshop',
    method: 'post',
    data: data
  })
}

// 禁用网店对接
export function disablePlatformShop(data) {
  return request({
    url: 'xnkj/base/platformshop/disablePlatformshop',
    method: 'post',
    data: data
  })
}
