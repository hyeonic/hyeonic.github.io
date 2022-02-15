const getConfig = require("vuepress-bar");
const { sidebar } = getConfig();

module.exports = {
    title: '배움을 기록',
    description: 'hyeonic 기술 블로그',
    themeConfig: {
        nav: [
            {text: 'tag', link: '/해시태그/'},
            {text: 'problem solving', link: '/problem-solving/'},
            {text: 'java', link: '/java/'},
            {text: 'spring', link: '/spring/'},
            {text: 'til', link: '/til/'},
            {
                text: "Info",
                items: [
                  { text: "Github", link: "https://github.com/hyeonic" },
                  {
                    text: "건의하기",
                    link: "https://github.com/hyeonic/hyeonic.github.io/issues"
                  },
                  {
                    text: "project",
                    items: [
                      {
                        text: "music-ward",
                        link: "https://github.com/OPGG-HACKTHON/MusicWard-Server"
                      },
                    ]
                  }
                ]
              }
        ],
        sidebar,
        lastUpdated: 'last updated',
        smoothScroll: true
    },
    plugins: [
      ["@vuepress/back-to-top"],
      ["@vuepress/last-updated"],
      ["vuepress-plugin-code-copy"],
      ['@vuepress/search', {
        searchMaxSuggestions: 10
      }],
      ["sitemap", { hostname: "https://hyeonic.github.io/"}],
      ['feed', { canonical_base: 'https://hyeonic.github.io' }]
    ],
    markdown: {
      extendMarkdown: md => {
        md.use(require('markdown-it-task-lists'))
      }
    }
};