import request from '@/utils/request'

// 获取审单流程列表
export function getExamineList(data) {
  return request({
    url: 'xnkj/base/examine/examineList',
    method: 'post',
    data: data
  })
}

// 修改审单流程
export function editExamine(data) {
  return request({
    url: 'xnkj/base/examine/editExamine',
    method: 'post',
    data: data
  })
}

// 添加审单流程
export function addExamine(data) {
  return request({
    url: 'xnkj/base/examine/addExamine',
    method: 'post',
    data: data
  })
}

// 禁用审单流程
export function disableExamine(data) {
  return request({
    url: 'xnkj/base/examine/disableExamine',
    method: 'post',
    data: data
  })
}

