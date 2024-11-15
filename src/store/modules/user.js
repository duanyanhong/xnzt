import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.verifyCode, userInfo.loginId).then(res => {
          if(res.errCode==0){
            sessionStorage.setItem('xn_token', res.msgData.accessToken)
            setToken(res.msgData.accessToken)
            commit('SET_TOKEN', res.msgData.accessToken)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if(res){
            const user = res.msgData.user
            const avatar = require("@/assets/img/avatar.png")
            if (res.msgData.roles && res.msgData.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              sessionStorage.setItem('xn_user_account', res.msgData.user.userAccount)
              sessionStorage.setItem('xn_role_name', res.msgData.user.roleName)
              commit('SET_ROLES', res.msgData.roles)
              commit('SET_PERMISSIONS', res.msgData.permissions)
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT'])
            }
            commit('SET_NAME', user.userName)
            commit('SET_AVATAR', avatar)
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
