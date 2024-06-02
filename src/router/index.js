import Vue from 'vue'
import Router from 'vue-router'
import Dishboard from '@/components/Dishboard'
import IndexData from '@/components/IndexData'
import SymbolData from '@/components/SymbolData'
import SymbolDayData from '@/components/SymbolDayData'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/indexdata',
            name: 'indexData',
            component: IndexData
        },
        {
            path: '/symboldata',
            name: 'SymbolData',
            component: SymbolData
        },
        {
            path: '/symboldaydata',
            name: 'SymbolDayData',
            component: SymbolDayData
        },
        {
            path: '/',
            name: 'Dishboard',
            component: Dishboard
        },
        {
            path: '/Dishboard',
            name: 'Dishboard',
            component: Dishboard
        },
    ]
})