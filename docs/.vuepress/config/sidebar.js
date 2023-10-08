//侧边栏
// const autosidebar = require('vuepress-auto-sidebar-doumjun')
const {getChildren} = require("vuepress-sidebar-atuo")

module.exports = {
    '/knowledge/': [
        {
            title: 'Lessons',
            collapsable: true,
            children: getChildren('./docs/knowledge/Lessons/')
        },
        {
            title: 'Books',
            collapsable: true,
            children: getChildren('./docs/knowledge/Book/')
        }, 
        {
            title: 'Survey',
            collapsable: true,
            children:getChildren('./docs/knowledge/Survey/')
        },
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