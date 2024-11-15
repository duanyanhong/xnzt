import request from '@/utils/request'

// 列表
export function getGoodssuiteList(data) {
  return request({
    url: 'xnkj/goods/suite/suiteList',
    method: 'post',
    data: data
  })
}

// 修改
export function editGoodssuite(data) {
  return request({
    url: 'xnkj/goods/suite/editSuite',
    method: 'post',
    data: data
  })
}

// 添加
export function addGoodssuite(data) {
  return request({
    url: 'xnkj/goods/suite/addSuite',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableGoodssuite(data) {
  return request({
    url: 'xnkj/goods/suite/disableSuite',
    method: 'post',
    data: data
  })
}

// 导入
export function importGoodssuite(data) {
  return request({
    url: 'xnkj/goods/suite/importSuite',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportGoodssuite(data) {
  return request({
    url: 'xnkj/goods/suite/exportSuite',
    method: 'post',
    data: data
  })
}

// 商品明细
export function getGoods(data) {
  return request({
    url: 'xnkj/goods/suite/getGoods',
    method: 'post',
    data: data
  })
}

//组合明细
export function getSuitedetail(data) {
  return request({
    url: 'xnkj/goods/suite/getSuitedetail',
    method: 'post',
    data: data
  })
}
