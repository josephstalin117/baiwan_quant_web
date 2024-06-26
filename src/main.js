// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as echarts from 'echarts'

Vue.config.productionTip = false
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
// 引入全局文件common.js
import common from './common'

Vue.prototype.$http = axios
Vue.prototype.$url = 'http://localhost:5000'
Vue.prototype.$common = common
Vue.prototype.$echarts = echarts

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})