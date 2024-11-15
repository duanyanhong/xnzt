import request from '@/utils/request'

// 获取公司列表
export function getCompanyList(data) {
  return request({
    url: 'xnkj/user/company/companyList',
    method: 'post',
    data: data
  })
}

// 修改公司
export function editCompany(data) {
  return request({
    url: 'xnkj/user/company/editCompany',
    method: 'post',
    data: data
  })
}

// 添加公司
export function addCompany(data) {
  return request({
    url: 'xnkj/user/company/addCompany',
    method: 'post',
    data: data
  })
}

// 禁用公司
export function disableCompany(data) {
  return request({
    url: 'xnkj/user/company/disableCompany',
    method: 'post',
    data: data
  })
}

