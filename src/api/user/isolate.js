import request from '@/utils/request'

// 获取用户列表
export function getIsolateList(data) {
  return request({
    url: 'xnkj/user/isolate/isolateList',
    method: 'post',
    data: data
  })
}

// 获取物理仓
export function getLogicWarehouse(data) {
  return request({
    url: 'xnkj/user/isolate/getLogicWarehouse',
    method: 'post',
    data: data
  })
}

// 获取店铺
export function getShop(data) {
  return request({
    url: 'xnkj/user/isolate/getShop',
    method: 'post',
    data: data
  })
}

// 编辑数据权限
export function setIsolate(data) {
  return request({
    url: 'xnkj/user/isolate/setIsolate',
    method: 'post',
    data: data
  })
}


