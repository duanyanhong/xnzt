import request from '@/utils/request'

// 列表
export function getSiteList(data) {
  return request({
    url: 'xnkj/base/site/siteList',
    method: 'post',
    data: data
  })
}

// 修改
export function editSite(data) {
  return request({
    url: 'xnkj/base/site/editSite',
    method: 'post',
    data: data
  })
}

// 添加
export function addSite(data) {
  return request({
    url: 'xnkj/base/site/addSite',
    method: 'post',
    data: data
  })
}

// 禁用
export function disableSite(data) {
  return request({
    url: 'xnkj/base/site/disableSite',
    method: 'post',
    data: data
  })
}

// 导入
export function importSite(data) {
  return request({
    url: 'xnkj/base/site/importSite',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: data
  })
}

// 导出
export function exportSite(data) {
  return request({
    url: 'xnkj/base/site/exportSite',
    method: 'post',
    data: data
  })
}

