import request from '@/utils/request'

// 获取公司列表
export function getDepartmentList(data) {
  return request({
    url: 'xnkj/user/department/departmentList',
    method: 'post',
    data: data
  })
}

// 修改公司
export function editDepartment(data) {
  return request({
    url: 'xnkj/user/department/editDepartment',
    method: 'post',
    data: data
  })
}

// 添加公司
export function addDepartment(data) {
  return request({
    url: 'xnkj/user/department/addDepartment',
    method: 'post',
    data: data
  })
}

// 禁用公司
export function disableDepartment(data) {
  return request({
    url: 'xnkj/user/department/disableDepartment',
    method: 'post',
    data: data
  })
}

