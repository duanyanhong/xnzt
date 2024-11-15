import request from '@/utils/request'

// 列表
export function getSitegoodsList(data) {
  return request({
    url: 'xnkj/goods/sitegoods/sitegoodsList',
    method: 'post',
    data: data
  })
}

// 修改
export function editSitegoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/editSitegoods',
    method: 'post',
    data: data
  })
}

// 添加
export function addSitegoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/addSitegoods',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableSitegoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/disableSitegoods',
    method: 'post',
    data: data
  })
}


// 门店
export function getSite(data) {
  return request({
    url: 'xnkj/goods/sitegoods/getSite',
    method: 'post',
    data: data
  })
}


// 商品
export function getGoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/getGoods',
    method: 'post',
    data: data
  })
}

// 导入
export function importSitegoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/importSitegoods',
    method: 'post',
    data: data
  })
}


// 导出
export function exportSitegoods(data) {
  return request({
    url: 'xnkj/goods/sitegoods/exportSitegoods',
    method: 'post',
    data: data
  })
}


