import request from '@/utils/request'

// 获取逻辑仓库列表
export function getLogicwarehouseList(data) {
  return request({
    url: 'xnkj/base/logicwarehouse/logicwarehouseList',
    method: 'post',
    data: data
  })
}

// 修改逻辑仓库
export function editLogicwarehouse(data) {
  return request({
    url: 'xnkj/base/logicwarehouse/editLogicwarehouse',
    method: 'post',
    data: data
  })
}

// 添加逻辑仓库
export function addLogicwarehouse(data) {
  return request({
    url: 'xnkj/base/logicwarehouse/addLogicwarehouse',
    method: 'post',
    data: data
  })
}

// 禁用逻辑仓库
export function disableLogicwarehouse(data) {
  return request({
    url: 'xnkj/base/logicwarehouse/disableLogicwarehouse',
    method: 'post',
    data: data
  })
}
