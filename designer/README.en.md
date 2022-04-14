# Data Hu report-designer

#### 介绍

Data Hu 报表设计器, 用于数据分析、数据建模、报表设计。
网站地址： [https://datahu.cn](https://datahu.cn)
文档地址： [https://datahu.cn/docs/](https://datahu.cn/docs/)

![](/datahu.gif)
![](/docs/full.png)

#### v1.2.1 Latest

1、重构代码结构，修复部分 bug
2、从 desktop 拆分 designer 出来，支持扩展 web 端在线设计
[datahu-mac-1.2.1.dmg](https://cdn.datahu.cn/update/datahu-mac-1.2.1.dmg)
[datahu-win-1.2.1.exe](https://cdn.datahu.cn/update/datahu-win-1.2.1.exe)

#### 在线示例

- [新建在线报表](https://datahu.cn/designer?cid=4&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsIm1vYmlsZSI6IjE4NTAwMDQ1MzU4IiwiZW1haWwiOiIxODUwMDA0NTM1OCIsImF2YXRhciI6bnVsbCwibmFtZSI6Iua1i-ivleeUqOaItyIsImlhdCI6MTY0OTkxMzQ4NCwiZXhwIjoxNjUwMjczNDg0fQ.FALf24-cvIRpPu9iMK4kMFuJqZy7V6Sqmg9vzphVzXU)
- [新冠疫情简单报表示例](https://datahu.cn/designer?key=ed52b2d42b1ce34a4a179c2f5087a45f5e630b2b385b597469e4a3bd17124208&name=新冠疫情V1.0&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsIm1vYmlsZSI6IjE4NTAwMDQ1MzU4IiwiZW1haWwiOiIxODUwMDA0NTM1OCIsImF2YXRhciI6bnVsbCwibmFtZSI6Iua1i-ivleeUqOaItyIsImlhdCI6MTY0OTkxMzQ4NCwiZXhwIjoxNjUwMjczNDg0fQ.FALf24-cvIRpPu9iMK4kMFuJqZy7V6Sqmg9vzphVzXU)
- [新冠疫情大屏报表示例](https://datahu.cn/designer?key=ed52b2d42b1ce34a4a179c2f5087a45f1a402e82226a77f2852ea4615b5ec344&name=新冠疫情大屏V1.0&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsIm1vYmlsZSI6IjE4NTAwMDQ1MzU4IiwiZW1haWwiOiIxODUwMDA0NTM1OCIsImF2YXRhciI6bnVsbCwibmFtZSI6Iua1i-ivleeUqOaItyIsImlhdCI6MTY0OTkxMzQ4NCwiZXhwIjoxNjUwMjczNDg0fQ.FALf24-cvIRpPu9iMK4kMFuJqZy7V6Sqmg9vzphVzXU)

#### 开始开发

1. 克隆项目，从仓库克隆源码到本地

   ```
   git clone git@github.com:datahu-cn/report-designer.git`
   cd report-designer
   ```

2. 初始化项目

   ```
   yarn preinit
   ```

3. 启动项目，此时为开发模式

   ```
   yarn start
   ```

4. 打包项目，打包成功后，将在 desktop/dist 下生成对应环境的安装包

   ```
   yarn package
   ```

#### 支持的功能

#### 自定义可视化组件

[https://github.com/datahu-cn/component-template](https://github.com/datahu-cn/component-template)

##### 布局容器

- [多页布局](https://datahu.cn/docs/chart/page-layout.html)

- [响应式栅格布局](https://datahu.cn/docs/chart/grid-layout.html)

- [拆分行列布局](https://datahu.cn/docs/chart/split-layout.html)

##### 图表组件

- [线性图](https://datahu.cn/docs/chart/line-chart.html)

- [面积图](https://datahu.cn/docs/chart/area-chart.html)

- [柱状图](https://datahu.cn/docs/chart/bar-chart.html)

- [条形图](https://datahu.cn/docs/chart/bar-horizontal-chart.html)

- [饼图](https://datahu.cn/docs/chart/pie-chart.html)

- [散点图](https://datahu.cn/docs/chart/scatter-chart.html)

- [K 线图](https://datahu.cn/docs/chart/candlestick-chart.html)

- [瀑布图](https://datahu.cn/docs/chart/waterfall-chart.html)

- [矩形树图](https://datahu.cn/docs/chart/treemap-chart.html)

- [仪表盘](https://datahu.cn/docs/chart/gauge-chart.html)

- [漏斗图](https://datahu.cn/docs/chart/funnel-chart.html)

- [雷达图](https://datahu.cn/docs/chart/radar-chart.html)

- [数据表](https://datahu.cn/docs/chart/data-table.html)

- [密度地图](https://datahu.cn/docs/chart/density-map-chart.html)

- [热点地图](https://datahu.cn/docs/chart/heat-amap-chart.html)

- [路径地图](https://datahu.cn/docs/chart/lines-amap-chart.html)

- [散点地图](https://datahu.cn/docs/chart/scatter-amap-chart.html)

- [卡片](https://datahu.cn/docs/chart/card.html)

- [富文本](https://datahu.cn/docs/chart/rich-text.html)

- [过滤器](https://datahu.cn/docs/chart/simple-slicer.html)

##### 数据源

- [excel](https://datahu.cn/docs/datasource/excel.html)

- [Influx DB](https://datahu.cn/docs/datasource/influx.html)

- [MySql 数据库](https://datahu.cn/docs/datasource/mysql.html)

- [Sql Server 数据库](https://datahu.cn/docs/datasource/sqlserver.html)

- [Oracle 数据库](https://datahu.cn/docs/datasource/oracle.html)

- [Restful API](https://datahu.cn/docs/datasource/restful.html)

- [PostgreSQL](https://datahu.cn/docs/datasource/postgresql.html)

- [Domino](https://datahu.cn/docs/datasource/domino.html)
