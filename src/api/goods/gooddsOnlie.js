import request from '@/utils/request'

// 列表
export function getOnlinegoosList(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/onlinegoodsList',
    method: 'post',
    data: data
  })
}

// 主导商品列表
export function getguildgoosList(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/getGoods',
    method: 'post',
    data: data
  })
}
  

// 匹配网店商品和主导商品
export function matchOnlinegoods(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/matchOnlinegoods',
    method: 'post',
    data: data
  })
}
  
  
// 修改
export function editGoodssuite(data) {
  return request({
    url: 'xnkj/goods/goodssuite/editGoodssuite',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodssuite(data) {
  return request({
    url: 'xnkj/goods/goodssuite/addGoodssuite',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodssuite(data) {
  return request({
    url: 'xnkj/goods/goodssuite/disableGoodssuite',
    method: 'post',
    data: data
  })
}

// 导入
export function importOnlinegoods(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/importOnlinegoods',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportGoodonline(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/exportOnlinegoods',
    method: 'post',
    data: data
  })
}

// 商品明细
export function getGoods(data) {
  return request({
    url: 'xnkj/goods/goodssuite/getGoods',
    method: 'post',
    data: data
  })
}

//组合明细
export function getSuitedetail(data) {
  return request({
    url: 'xnkj/goods/goodssuite/getSuitedetail',
    method: 'post',
    data: data
  })
}
//货品标记
export function markOnlinegoods(data) {
  return request({
    url: 'xnkj/goods/onlinegoods/markOnlinegoods',
    method: 'post',
    data: data
  })
}
