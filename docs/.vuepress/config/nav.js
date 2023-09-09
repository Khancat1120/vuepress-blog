//导航栏
module.exports = [
    {text: 'Home page', link: '/index.html'},
    {
        text: 'Knowledge',
        items: [
                {
                    text: 'Lessons',
                    link:'/knowledge/Lessons/01-CS224W'
                },{
                    text: 'Books',
                    link:'/knowledge/Book/test'
                },{
                    text: 'Survey',
                    link:'/knowledge/Survey/01-Textgraph'
                },{
                    text: 'Interview',
                    link:'/knowledge/Interview/test'
                },{
                    text: 'Weird part',
                    link:'/knowledge/funny/English'
                },
            ]
    },
    {
        text: 'Technology', 
        items: [
                {
                    text: 'Algorithms',
                    link:'/technology/code/test' 
                },
                {
                    text: 'Models',
                    link:'/technology/model/test'
                },
                {
                    text: 'Environments',
                    link:'/technology/environment/1-install'
                },
                {
                    text: 'Tools',
                    link:'/technology/tool/test'
                },
                {
                    text: 'Bugs',
                    link:'/technology/bug/bug'
                },
            ]
    },
    {text: 'Essay', link: '/jottings/1-个人陈述',},
    {text: 'About me', link: '/about/',},
]