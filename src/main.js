import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download } from '@/utils/request'
import { resizeTable } from '@/utils/onresizeInnerHeight'
import axios from 'axios'
import commonApi from '@/utils/commonApi'

import './assets/icons' // icon
import './permission' // permission control
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 头部标签组件
import VueMeta from 'vue-meta'
// 筛选输入框组件
import InputDialog from '@/components/InputDialog'
// 时间组件
import DateRangePicker from '@/components/DateRangePicker'
// table大数据渲染
import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css' // 引入样式
// 权限指令
import permission from './components/Permission'
// 多选工具
import SelectToolbar from '@/components/SelectToolbar'
// 表格字段排序显示工具
import FieldSort from '@/components/FieldSort'

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.resizeTable = resizeTable
Vue.prototype.handleTree = handleTree
Vue.prototype.$axios = axios
Vue.prototype.$commonApi = commonApi
Vue.component('DateRangePicker', DateRangePicker)

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)
Vue.component('InputDialog', InputDialog)
Vue.component('SelectToolbar', SelectToolbar)
Vue.component('FieldSort', FieldSort)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(UmyUi)
Vue.use(permission)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: 'small' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
