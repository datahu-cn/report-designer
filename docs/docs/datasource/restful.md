# Restful API 数据源连接

## 配置 Restful API 连接

进入数据源管理菜单，点击新建数据源按钮，选择 Restful API， 在打开的弹出框中填写 API 请求地址等信息，如图所示:

![](/assets/2021-08-23-17-59-16-image.png)

配置时请注意，在未指定请求头的 content-type 时，默认值为 application/json， 同时，返回的数据默认在属性 data 上，如为其他值， 请设置”数据所在字段“， 返回的数据格式为两种， 分别是单表`Array<Object>`和多表的`Object<Array<Object>>` 两种。

## 选择表格

数据源配置连接成功后，进入数据表选择页面，如图所示，在左侧表格列表中选择需要使用的数据库表，点击提交即可完成数据导入：

![](/assets/2021-08-23-18-00-18-image.png)
