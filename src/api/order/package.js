import request from '@/utils/request'

// 列表
export function getPackageList(data) {
  return request({
    url: 'xnkj/order/package/packageList',
    method: 'post',
    data: data
  })
}

// 导出
export function exportPackage(data) {
  return request({
    url: 'xnkj/order/package/exportPackage',
    method: 'post',
    data: data
  })
}

