import request from '@/utils/request'

// 获取审单节点列表
export function getProcessList(data) {
  return request({
    url: 'xnkj/base/process/processList',
    method: 'post',
    data: data
  })
}

// 修改审单节点
export function editProcess(data) {
  return request({
    url: 'xnkj/base/process/editProcess',
    method: 'post',
    data: data
  })
}

// 添加审单节点
export function addProcess(data) {
  return request({
    url: 'xnkj/base/process/addProcess',
    method: 'post',
    data: data
  })
}

// 禁用审单节点
export function disableProcess(data) {
  return request({
    url: 'xnkj/base/process/disableProcess',
    method: 'post',
    data: data
  })
}

