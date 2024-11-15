import request from '@/utils/request'

// 列表
export function getGoodsbrandList(data) {
  return request({
    url: 'xnkj/goods/brand/brandList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoodsbrand(data) {
  return request({
    url: 'xnkj/goods/brand/editBrand',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodsbrand(data) {
  return request({
    url: 'xnkj/goods/brand/addBrand',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodsbrand(data) {
  return request({
    url: 'xnkj/goods/brand/disableBrand',
    method: 'post',
    data: data
  })
}

