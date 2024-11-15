import request from '@/utils/request'

// 列表
export function allocationOutList(data) {
  return request({
    url: 'xnkj/stock/allocationout/allocationOutList',
    method: 'post',
    data: data
  })
}

export function getAllocationOutDetail(data) {
  return request({
    url: 'xnkj/stock/allocationout/getAllocationOutDetail',
    method: 'post',
    data: data
  })
}

export function exportAllocationOutDetail(data) {
  return request({
    url: 'xnkj/stock/allocationout/exportAllocationOutDetail',
    method: 'post',
    data: data
  })
}



