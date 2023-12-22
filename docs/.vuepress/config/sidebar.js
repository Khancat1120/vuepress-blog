//侧边栏
// const autosidebar = require('vuepress-auto-sidebar-doumjun')
const {getChildren} = require("vuepress-sidebar-atuo")

module.exports = {
    '/knowledge/': [
        {
            title: 'Survey',
            collapsable: true,
            children:getChildren('./docs/knowledge/Survey/')
        },
        // {
        //     title: 'Lectures',
        //     collapsable: true,
        //     children: getChildren('./docs/knowledge/Lectures/')
        // },
        {
            title: 'Language',
            collapsable: true,
            children:getChildren('./docs/knowledge/Language/')
        },
    ],
    '/technology/':[
        {
            title: 'Bugs',
            collapsable: true,
            children: getChildren('./docs/technology/bug/')
        },
        {
            title: 'Codes',
            collapsable: true,
            children: getChildren('./docs/technology/code/')
        },
        {
            title: 'Tools',
            collapsable: true,
            children: getChildren('./docs/technology/tool/')
        },
    ],
    '/jottings/':[
        {
            title: 'Essay',
            collapsable: true,
            children: getChildren('./docs/jottings/')
        },
    ],

}