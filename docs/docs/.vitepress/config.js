module.exports = {
  base: '/docs/',
  title: 'Data Hu',
  description: '文档',
  lang: 'zh-CN',
  themeConfig: {
    // repo: 'vuejs/vitepress',
    docsDir: 'docs',
    heroImage: '',

    editLinks: false,
    editLinkText: '编辑',
    lastUpdated: '上次更新时间',

    algolia: {
      apiKey: 'de738b15db6808f1182dc7af432aacf0',
      indexName: 'datahu-docs'
    },

    // carbonAds: {
    //   carbon: 'CEBDT27Y',
    //   custom: 'CKYD62QM',
    //   placement: 'vuejsorg'
    // },

    nav: [
      {text: '教程', link: '/', activeMatch: '^/$|^/guide/'},
      {
        text: '图表',
        link: '/chart/page-layout.html',
        activeMatch: '^/chart/'
      },
      {
        text: '数据源',
        link: '/datasource/excel.html',
        activeMatch: '^/datasource/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/datahu-cn/report-designer'
      },
      {
        text: 'Getee',
        link: 'https://gitee.com/datahu-cn/report-designer'
      },
      {
        text: 'Data Hu',
        link: 'https://datahu.cn'
      }
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/chart/': getChartSidebar(),
      '/datasource/': getDatasourceSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: '介绍',
      children: [
        {text: '什么是 Data Hu', link: '/'},
        {text: '起步', link: '/guide/getting-started'},
        {text: '示例:第七次全人口普查', link: '/guide/sample1'}
      ]
    },
    {
      text: '高级',
      children: [
        {text: '事件', link: '/guide/event'},
        {text: '自定义代码', link: '/guide/code'},
        {text: '代理网关', link: '/guide/gateway'}
      ]
    }
  ]
}

function getChartSidebar() {
  return [
    {
      text: '布局',
      children: [
        {text: '多页布局', link: '/chart/page-layout'},
        {text: '响应式栅格布局', link: '/chart/grid-layout'},
        {text: '拆分行列布局', link: '/chart/split-layout'}
      ]
    },
    {
      text: '图表',
      children: [
        {text: '线性图', link: '/chart/line-chart'},
        {text: '面积图', link: '/chart/area-chart'},
        {text: '柱状图', link: '/chart/bar-chart'},
        {text: '条形图', link: '/chart/bar-horizontal-chart'},
        {text: '饼图', link: '/chart/pie-chart'},
        {text: '散点图', link: '/chart/scatter-chart'},
        {text: 'K线图', link: '/chart/candlestick-chart'},
        {text: '瀑布图', link: '/chart/waterfall-chart'},
        {text: '矩形树图', link: '/chart/treemap-chart'},
        {text: '仪表盘', link: '/chart/gauge-chart'},
        {text: '漏斗图', link: '/chart/funnel-chart'},
        {text: '雷达图', link: '/chart/radar-chart'},
        {text: '数据表', link: '/chart/data-table'},
        {text: '密度地图', link: '/chart/density-map-chart'},
        {text: '热点地图', link: '/chart/heat-amap-chart'},
        {text: '路径地图', link: '/chart/lines-amap-chart'},
        {text: '散点地图', link: '/chart/scatter-amap-chart'},
        {text: '卡片', link: '/chart/card'},
        {text: '富文本', link: '/chart/rich-text'},
        {text: '过滤器', link: '/chart/simple-slicer'}
      ]
    }
  ]
}

function getDatasourceSidebar() {
  return [
    {
      text: '支持的数据源',
      children: [
        {text: 'excel', link: '/datasource/excel'},
        {text: 'Influx DB', link: '/datasource/influx'},
        {text: 'MySql数据库', link: '/datasource/mysql'},
        {text: 'Sql Server数据库', link: '/datasource/sqlserver'},
        {text: 'Oracle 数据库', link: '/datasource/oracle'},
        {text: 'Restful API', link: '/datasource/restful'}
      ]
    }
  ]
}
