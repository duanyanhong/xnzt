import request from '@/utils/request'

// 列表
export function getVoidstockoutorderList(data) {
  return request({
    url: 'xnkj/order/voidstockoutorder/voidstockoutorderList',
    method: 'post',
    data: data
  })
}

// 导出
export function exportVoidsaleorder(data) {
  return request({
    url: 'xnkj/order/voidstockoutorder/exportVoidsaleorder',
    method: 'post',
    data: data
  })
}

