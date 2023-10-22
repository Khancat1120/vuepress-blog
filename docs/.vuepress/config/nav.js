//导航栏
module.exports = [
    {text: 'Home page', link: '/index.html'},
    {
        text: 'Knowledge',
        items: [
                {
                    text: 'Survey',
                    link: '/knowledge/Survey/01-Textgraph'
                },
                {
                    text: 'Lectures',
                    link: '/knowledge/Lectures/01-CS224W'
                },
                // {
                //     text: 'Books',
                //     link: '/knowledge/Book/01-Graphon'
                // },
                {
                    text: 'Language',
                    link: '/knowledge/Language/01-English'
                },
            ]
    },
    {
        text: 'Technology', 
        items: [
                {
                    text: 'Codes',
                    link:'/technology/code/01-GNN'
                },
                {
                    text: 'Tools',
                    link:'/technology/tool/01-install'
                },
                {
                    text: 'Bugs',
                    link:'/technology/bug/bug'
                },
            ]
    },
    {text: 'Essay', link: '/jottings/01-自传',},
    {text: 'About me', link: '/about/',},
]