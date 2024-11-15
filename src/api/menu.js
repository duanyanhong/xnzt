import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  const accessToken = sessionStorage.getItem('xn_token')
  return request({
    url: 'xnkj/login/login/menus',
    method: 'post',
    data: {
      accessToken
    }
  })
}
