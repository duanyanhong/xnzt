import request from '@/utils/request'

// 列表
export function getGoodsfamilyList(data) {
  return request({
    url: 'xnkj/goods/family/familyList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoodsfamily(data) {
  return request({
    url: 'xnkj/goods/family/editFamily',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodsfamily(data) {
  return request({
    url: 'xnkj/goods/family/addFamily',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodsfamily(data) {
  return request({
    url: 'xnkj/goods/family/disableFamily',
    method: 'post',
    data: data
  })
}

// 一级分类
export function getGoodsfamily(data) {
  return request({
    url: 'xnkj/goods/family/getFamily',
    method: 'post',
    data: data
  })
}

