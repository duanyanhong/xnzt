import request from '@/utils/request'

// 列表
export function getGoodsmarkList(data) {
  return request({
    url: 'xnkj/goods/mark/markList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoodsmark(data) {
  return request({
    url: 'xnkj/goods/mark/editMark',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodsmark(data) {
  return request({
    url: 'xnkj/goods/mark/addMark',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodsmark(data) {
  return request({
    url: 'xnkj/goods/mark/disableMark',
    method: 'post',
    data: data
  })
}

