import request from '@/utils/request'

// 获取货主列表
export function getOwnerList(data) {
  return request({
    url: 'xnkj/base/owner/ownerList',
    method: 'post',
    data: data
  })
}

// 修改货主
export function editOwner(data) {
  return request({
    url: 'xnkj/base/owner/editOwner',
    method: 'post',
    data: data
  })
}

// 添加货主
export function addOwner(data) {
  return request({
    url: 'xnkj/base/owner/addOwner',
    method: 'post',
    data: data
  })
}

// 禁用货主
export function disableOwner(data) {
  return request({
    url: 'xnkj/base/owner/disableOwner',
    method: 'post',
    data: data
  })
}

// 获取货主配置列表
export function ownerConfList(data) {
  return request({
    url: 'xnkj/base/ownerconfig/ownerconfigList',
    method: 'post',
    data: data
  })
}

// 添加货主配置
export function addOwnerconfig(data) {
  return request({
    url: 'xnkj/base/ownerconfig/addOwnerconfig',
    method: 'post',
    data: data
  })
}

// 修改货主配置
export function editOwnerconfig(data) {
  return request({
    url: 'xnkj/base/ownerconfig/editOwnerconfig',
    method: 'post',
    data: data
  })
}