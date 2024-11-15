import request from '@/utils/request'

// 列表
export function getSourceorderList(data) {
  return request({
    url: 'xnkj/order/sourceorder/sourceorderList',
    method: 'post',
    data: data
  })
}

// 审核
export function toSourceorder(data) {
  return request({
    url: 'xnkj/order/sourceorder/toSourceorder',
    method: 'post',
    data: data
  })
}

// 导出
export function exportSourceorder(data) {
  return request({
    url: 'xnkj/order/sourceorder/exportSourceorder',
    method: 'post',
    data: data
  })
}

