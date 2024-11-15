import request from '@/utils/request'

// 列表
export function getSiteabcList(data) {
  return request({
    url: 'xnkj/goods/siteabc/siteabcList',
    method: 'post',
    data: data
  })
}

// 修改
export function editSiteabc(data) {
  return request({
    url: 'xnkj/goods/siteabc/editSiteabc',
    method: 'post',
    data: data
  })
}

// 添加
export function addSiteabc(data) {
  return request({
    url: 'xnkj/goods/siteabc/addSiteabc',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableSiteabc(data) {
  return request({
    url: 'xnkj/goods/siteabc/disableSiteabc',
    method: 'post',
    data: data
  })
}


// 门店
export function getSite(data) {
  return request({
    url: 'xnkj/goods/siteabc/getSite',
    method: 'post',
    data: data
  })
}

// 导入
export function importSiteabc(data) {
  return request({
    url: 'xnkj/goods/siteabc/importSiteabc',
    method: 'post',
    data: data
  })
}


// 导出
export function exportSiteabc(data) {
  return request({
    url: 'xnkj/goods/siteabc/exportSiteabc',
    method: 'post',
    data: data
  })
}


