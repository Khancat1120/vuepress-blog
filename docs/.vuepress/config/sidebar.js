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
            title: 'Papers',
            collapsable: true,
            children:getChildren('./docs/knowledge/Paper/')
        },
        {
            title: 'Interview',
            collapsable: true,
            children:getChildren('./docs/knowledge/Interview/')
        },
        {
            title: 'Weird part',
            collapsable: true,
            children:getChildren('./docs/knowledge/Funny/')
        },
    ],
    '/technology/':[
        {
            title: 'Algorithms',
            collapsable: true,
            children: getChildren('./docs/technology/code/')
        },
        {
            title: 'Models',
            collapsable: true,
            children: getChildren('./docs/technology/model/')
        },
        {
            title: 'Environments',
            collapsable: true,
            children: getChildren('./docs/technology/environment/')
        },
        {
            title: 'Bugs',
            collapsable: true,
            children: getChildren('./docs/technology/bug/')
        },
        {
            title: 'Tools',
            collapsable: true,
            children: getChildren('./docs/technology/tool/')
        },
    ],
    // '/jottings/':[
    //     {
    //         title: 'Essay',
    //         collapsable: true,
    //         children: getChildren('./docs/jottings/')
    //     },
    // ],

}