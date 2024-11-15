import request from '@/utils/request'

// 列表
export function getWarehousegoodsList(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/warehousegoodsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editWarehousegoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/editWarehousegoods',
    method: 'post',
    data: data
  })
}

// 添加
export function addWarehousegoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/addWarehousegoods',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableWarehousegoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/disableWarehousegoods',
    method: 'post',
    data: data
  })
}


// 仓库
export function getLogicwarehouse(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/getLogicwarehouse',
    method: 'post',
    data: data
  })
}


// 商品
export function getGoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/getGoods',
    method: 'post',
    data: data
  })
}

// 导入
export function importWarehousegoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/importWarehousegoods',
    method: 'post',
    data: data
  })
}


// 导出
export function exportWarehousegoods(data) {
  return request({
    url: 'xnkj/goods/warehousegoods/exportWarehousegoods',
    method: 'post',
    data: data
  })
}


