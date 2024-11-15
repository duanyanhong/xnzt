import request from '@/utils/request'

// 查询用户个人信息
export function getUserProfile() {
  const accessToken = sessionStorage.getItem('xn_token')
  return request({
    url: 'xnkj/login/login/refreshRole',
    method: 'post',
    data: {
      accessToken
    }
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: 'xnkj/login/login/updateInfo',
    method: 'post',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(data) {
  return request({
    url: 'xnkj/login/login/updatePwd',
    method: 'post',
    data: data
  })
}

// 操作日志
export function personLog(data) {
  return request({
    url: 'xnkj/login/login/personLog',
    method: 'post',
    data: data
  })
}
