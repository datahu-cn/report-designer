# 高德地图散点图

高德地图散点图，如图：

[演示报表](https://datahu.cn/report?key=c0092df798348ebbe344097cead5915a9dacc6b6a4ac1dfe67cc86c3b0c7ec61#/detail)

![](/assets/2021-09-15-13-46-22-image.png)

## 数据

分组：唯一值分组栏，可以是表格行序号等。

经度：地理位置的经度，高德地图坐标系

纬度：地理位置的纬度，高德地图坐标系

值：经度和纬度位置点对应的值，用户控制颜色深浅

视觉映射：视觉映射根据值的大小，动态控制线条的颜色、形状、大小等，与配置中的“视觉映射”配合使用，当需要的值不在其他栏目中时，可将该栏目拖拽到此处。

图表过滤：只对当前图表的数据进行过滤

全局过滤：对整个报表的数据进行过滤，同时也可在表格中对数据进行过滤，2 处操作产生效果相同

## 配置项

### 数据

开启增量刷新： 当数据量比较大且动画定时刷新图表数据时，可以开启该功能，页面切换更流畅

显示数据下钻按钮：当数据栏的分组下有多个栏目时，开启该功能会在组件右上角显示数据的下钻相关按钮

显示数据查看按钮：开启该功能会在组件右上角显示数据查看按钮

显示全屏按钮：开启该功能会在组件右上角显示全屏展开按钮

影响数据范围：在有数据下钻时有效，当数据下钻时，会对当前数据进行分组过滤，此处控制影响的组件范围

### 工具提示

控制鼠标移动到折线上时显示的 tooltip

样式：设置 tooltip 的样式

### 图例标签

列表朝向：横向和纵向，多条折线时生效

标记和文本位置：表格和文本的显示位置

距左、距右、距上、距下：标签在整个组件图表中的显示位置

文字样式：定义标签文字的样式

### 地图

定位中心坐标：地图中心点坐标，鼠标操作地图也可设置中心坐标

地图缩放级别：地图的缩放层级，鼠标操作地图也可设置缩放级别

俯仰角度：地图 3D 模式的俯仰角度

地图风格样式：地图的风格样式

遮挡地图层交互：是否遮挡鼠标对地图层的交互

### 图形

设置散点的样式、形状、颜色等

图形形状：此处可将散点变成涟漪散点

图形标记：散点图形形状

图形样式：散点图形样式

裁剪超出坐标系部分的图形：是否裁剪超出坐标系部分的图形，具体裁剪效果根据系列决定

线条样式：折线线条的样式

数据堆叠：同个类目轴上系列配置相同的堆叠值后，后一个系列的值会在前一个系列的值上相加。

标签样式：设置散点上的文字标签，控制是否显示和显示的位置、标签文字样式等

### 视觉映射

线性图的视觉映射到线条的颜色上，可配置线条颜色根据指定栏目值动态变化

连续型视觉映射组件：针对数值类型的，有连续变化的栏目进行映射

分段型视觉映射组件有三种模式：

- 连续型数据平均分段: 依据设置的分段数来自动平均分割成若干块。
- 连续型数据自定义分段: 依据精确指定的分段来定义每块范围。
- 离散数据（类别性数据）: 离散数据根据类别分段
