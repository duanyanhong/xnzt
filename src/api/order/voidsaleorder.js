import request from '@/utils/request'

// 列表
export function getVoidsaleorderList(data) {
  return request({
    url: 'xnkj/order/voidsaleorder/voidsaleorderList',
    method: 'post',
    data: data
  })
}

// 导出
export function exportVoidsaleorder(data) {
  return request({
    url: 'xnkj/order/voidsaleorder/exportVoidsaleorder',
    method: 'post',
    data: data
  })
}

// 恢复
export function restoreVoidsaleorder(data) {
  return request({
    url: 'xnkj/order/voidsaleorder/restoreVoidsaleorder',
    method: 'post',
    data: data
  })
}


