import request from '@/utils/request'

// 获取物理仓列表
export function getWarehouseList(data) {
  return request({
    url: 'xnkj/base/warehouse/warehouseList',
    method: 'post',
    data: data
  })
}

// 修改物理仓
export function editWarehouse(data) {
  return request({
    url: 'xnkj/base/warehouse/editWarehouse',
    method: 'post',
    data: data
  })
}

// 添加物理仓
export function addWarehouse(data) {
  return request({
    url: 'xnkj/base/warehouse/addWarehouse',
    method: 'post',
    data: data
  })
}

// 禁用物理仓
export function disableWarehouse(data) {
  return request({
    url: 'xnkj/base/warehouse/disableWarehouse',
    method: 'post',
    data: data
  })
}

// 获取部门
export function getDepartment(data) {
  return request({
    url: 'xnkj/base/warehouse/getDepartment',
    method: 'post',
    data: data
  })
}


