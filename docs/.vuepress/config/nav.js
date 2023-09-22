//导航栏
module.exports = [
    {text: 'Home page', link: '/index.html'},
    {
        text: 'Knowledge',
        items: [
                {
                    text: 'Survey',
                    link:'/knowledge/Survey/01-Textgraph'
                },
                {
                    text: 'Lessons',
                    link:'/knowledge/Lessons/01-CS224W'
                },
                {
                    text: 'Books',
                    link:'/knowledge/Book/01-Graphon'
                },
                // {
                //     text: 'Paper',
                //     link:'/knowledge/Paper/01-TextGCN'
                // },
                // {
                //     text: 'Interview',
                //     link:'/knowledge/Interview/test'
                // },
                {
                    text: 'Weird part',
                    link:'/knowledge/funny/English'
                },
            ]
    },
    {
        text: 'Technology', 
        items: [
                // {
                //     text: 'Algorithms',
                //     link:'/technology/code/test' 
                // },
                {
                    text: 'Codes',
                    link:'/technology/model/01-GNN'
                },
                {
                    text: 'Environments',
                    link:'/technology/environment/01-install'
                },
                {
                    text: 'Tools',
                    link:'/technology/tool/01-git'
                },
                {
                    text: 'Bugs',
                    link:'/technology/bug/bug'
                },
            ]
    },
    // {text: 'Essay', link: '/jottings/1-个人陈述',},
    {text: 'About me', link: '/about/',},
]