import request from '@/utils/request'

// 登录方法
export function login(userAccount, userPwd, verifyCode, loginId) {
  return request({
    url: 'xnkj/login/login/login',
    method: 'post',
    data: {
      userAccount,
      userPwd,
      verifyCode,
      loginId
    }
  })
}

// 获取用户详细信息
export function getInfo() {
  const accessToken = sessionStorage.getItem('xn_token')
  return request({
    url: 'xnkj/login/login/refreshRole',
    method: 'post',
    data: {
      accessToken
    }
  })
}


export function getCodeImg() {
  return request({
    url: 'xnkj/login/login/verifyCode',
    method: 'post'
  })
}

export function logout() {
  const accessToken = sessionStorage.getItem('xn_token')
  return request({
    url: 'xnkj/login/login/logout',
    method: 'post',
    data: {
      accessToken
    }
  })
}
