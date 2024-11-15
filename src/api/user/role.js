import request from '@/utils/request'

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: 'xnkj/user/role/roleList',
    method: 'post',
    data: data
  })
}

// 修改角色
export function editRole(data) {
  return request({
    url: 'xnkj/user/role/editRole',
    method: 'post',
    data: data
  })
}

// 添加角色
export function addRole(data) {
  return request({
    url: 'xnkj/user/role/addRole',
    method: 'post',
    data: data
  })
}

// 禁用角色
export function disableRole(data) {
  return request({
    url: 'xnkj/user/role/disableRole',
    method: 'post',
    data: data
  })
}

// 获取按钮权限
export function getButton(data) {
  return request({
    url: 'xnkj/user/role/getButton',
    method: 'post',
    data: data
  })
}

