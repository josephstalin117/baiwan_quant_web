import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AccReport from '@/components/AccReport'
import ReportList from '@/components/ReportList'
import AccNote from '@/components/AccNote'
import NoteList from '@/components/NoteList'
import Note from '@/components/Note'
import BibtexPaper from '@/components/BibtexPaper'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/reports',
            name: 'ReportList',
            component: ReportList
        },
        {
            path: '/addnote',
            name: 'AccNote',
            component: AccNote
        },
        {
            path: '/notes',
            name: 'NoteList',
            component: NoteList
        },
        {
            path: '/note/:id',
            name: 'Note',
            component: Note
        },
        {
            path: '/addreport',
            name: 'AccReport',
            component: AccReport
        },
        {
            path: '/bibtex',
            name: 'BibtexPaper',
            component: BibtexPaper
        },

    ]
})