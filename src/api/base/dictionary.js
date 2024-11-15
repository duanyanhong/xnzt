import request from '@/utils/request'

// 列表
export function dictionaryList(data) {
  return request({
    url: 'xnkj/base/dictionary/dictionaryList',
    method: 'post',
    data: data
  })
}
// 新增
export function addDictionary(data) {
    return request({
      url: 'xnkj/base/dictionary/addDictionary',
      method: 'post',
      data: data
    })
  }
// 编辑修改
export function editDictionary(data) {
    return request({
      url: 'xnkj/base/dictionary/editDictionary',
      method: 'post',
      data: data
    })
  }
// 禁用/启用
export function disableDictionary(data) {
    return request({
      url: 'xnkj/base/dictionary/disableDictionary',
      method: 'post',
      data: data
    })
  }

  // 明细列表
export function dictionaryDetailList(data) {
    return request({
      url: 'xnkj/base/dictionary/dictionaryDetailList',
      method: 'post',
      data: data
    })
  }
 
// 明细新增
export function addDictionaryDetail(data) {
    return request({
      url: 'xnkj/base/dictionary/addDictionaryDetail',
      method: 'post',
      data: data
    })
  }

  // 明细编辑
export function editDictionaryDetail(data) {
    return request({
      url: 'xnkj/base/dictionary/editDictionaryDetail',
      method: 'post',
      data: data
    })
  }
  
  // 明细删除
export function deleteDictionaryDetail(data) {
    return request({
      url: 'xnkj/base/dictionary/deleteDictionaryDetail',
      method: 'post',
      data: data
    })
  }
          
      
      
      