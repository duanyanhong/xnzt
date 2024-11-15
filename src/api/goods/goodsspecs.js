import request from '@/utils/request'

// 列表
export function getGoodsspecsList(data) {
  return request({
    url: 'xnkj/goods/specs/specsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoodsspecs(data) {
  return request({
    url: 'xnkj/goods/specs/editSpecs',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodsspecs(data) {
  return request({
    url: 'xnkj/goods/specs/addSpecs',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodsspecs(data) {
  return request({
    url: 'xnkj/goods/specs/disableSpecs',
    method: 'post',
    data: data
  })
}

