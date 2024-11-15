import request from '@/utils/request'

// 列表
export function getGoodsList(data) {
  return request({
    url: 'xnkj/goods/goods/goodsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoods(data) {
  return request({
    url: 'xnkj/goods/goods/editGoods',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoods(data) {
  return request({
    url: 'xnkj/goods/goods/addGoods',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoods(data) {
  return request({
    url: 'xnkj/goods/goods/disableGoods',
    method: 'post',
    data: data
  })
}

// 导入
export function importGoods(data) {
  return request({
    url: 'xnkj/goods/goods/importGoods',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportGoods(data) {
  return request({
    url: 'xnkj/goods/goods/exportGoods',
    method: 'post',
    data: data
  })
}

// 门店
export function getSite(data) {
  return request({
    url: 'xnkj/goods/goods/getSite',
    method: 'post',
    data: data
  })
}

// 转门店
export function turnSite(data) {
  return request({
    url: 'xnkj/goods/goods/turnSite',
    method: 'post',
    data: data
  })
}

// 转仓库
export function turnWarehouse(data) {
  return request({
    url: 'xnkj/goods/goods/turnWarehouse',
    method: 'post',
    data: data
  })
}

