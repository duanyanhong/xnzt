import request from '@/utils/request'

// 列表
export function getSupplierList(data) {
  return request({
    url: 'xnkj/base/supplier/supplierList',
    method: 'post',
    data: data
  })
}

// 修改
export function editSupplier(data) {
  return request({
    url: 'xnkj/base/supplier/editSupplier',
    method: 'post',
    data: data
  })
}

// 添加
export function addSupplier(data) {
  return request({
    url: 'xnkj/base/supplier/addSupplier',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableSupplier(data) {
  return request({
    url: 'xnkj/base/supplier/disableSupplier',
    method: 'post',
    data: data
  })
}
