import request from '@/utils/request'

// 列表
export function getAllocationList(data) {
  return request({
    url: 'xnkj/stock/allocation/allocationList',
    method: 'post',
    data: data
  })
}

export function addAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/addAllocation',
    method: 'post',
    data: data
  })
}

export function getAllocationDetail(data) {
  return request({
    url: 'xnkj/stock/allocation/getAllocationDetail',
    method: 'post',
    data: data
  })
}

export function getStock(data) {
  return request({
    url: 'xnkj/stock/allocation/getStock',
    method: 'post',
    data: data
  })
}

export function addAllocationDetail(data) {
  return request({
    url: 'xnkj/stock/allocation/addAllocationDetail',
    method: 'post',
    data: data
  })
}

export function importAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/importAllocation',
    method: 'post',
    data: data
  })
}

export function exportAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/exportAllocation',
    method: 'post',
    data: data
  })
}

export function examineAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/examineAllocation',
    method: 'post',
    data: data
  })
}

export function removeAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/removeAllocation',
    method: 'post',
    data: data
  })
}

export function interceptAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/interceptAllocation',
    method: 'post',
    data: data
  })
}

export function removeAllocationList(data) {
  return request({
    url: 'xnkj/stock/allocation/removeAllocationList',
    method: 'post',
    data: data
  })
}

export function restoreAllocation(data) {
  return request({
    url: 'xnkj/stock/allocation/restoreAllocation',
    method: 'post',
    data: data
  })
}





