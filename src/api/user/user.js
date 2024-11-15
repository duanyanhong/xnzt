import request from '@/utils/request'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: 'xnkj/user/user/userList',
    method: 'post',
    data: data
  })
}

// 修改用户
export function editUser(data) {
  return request({
    url: 'xnkj/user/user/editUser',
    method: 'post',
    data: data
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: 'xnkj/user/user/addUser',
    method: 'post',
    data: data
  })
}

// 禁用用户
export function disableUser(data) {
  return request({
    url: 'xnkj/user/user/disableUser',
    method: 'post',
    data: data
  })
}

// 获取部门
export function getDepartment(data) {
  return request({
    url: 'xnkj/user/user/getDepartment',
    method: 'post',
    data: data
  })
}

