/**
 * 
 *el,el2 页面其他元素
 * heigth默认高度
 */

export function resizeTable(el,el2,heigth=180) {
    let jsHeight =''
    // 设置表格高度
    jsHeight = window.innerHeight - el.outerHeight() - el2.outerHeight() - heigth
    // / 监听浏览器窗口变化，动态计算表格高度，
//     window.onresize = () => {
//     return (() => {
//         jsHeight = window.innerHeight - el.outerHeight() - el2.outerHeight() - heigth
//     })()
//  }
 return jsHeight
}