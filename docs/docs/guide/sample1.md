# 第七次全国人口普查

我们以第七次全国人口普查报表为例，完整的描述整个报表的设计过程，以供参考，完成后的报表效果参见[第七次全人口普查](https://datahu.cn/report?key=fdf416bcd73c2e5c76d00adaac667eb5d9cd202e801930aabd357c8d09294c93#/view), 效果如图：

![](/assets/2021-08-24-11-21-57-image.png)

## 准备数据

1. 首先，我们新建一个空白的报表，导入我们需要的数据，本报表需要的数据为：第七次全国人口普查,全国人口普查汇总表,地区行政名称映射,这些数据表可在”在线数据“中搜索到，如图所示：
   
   ![](/assets/2021-08-24-14-10-34-image.png)

2. 导入完 3 个表格数据后，我们需要给数据添加关联关系，点击左侧关系图表按钮，拖拽”地区行政名称映射“表的”地区“列到”第七次全人口普查“表的”地区“列，后续设计密度地图时将用到该关系，如图所示：
   
   ![](/assets/2021-08-24-14-08-53-image.png)

每个阶段处理过程中， 我们可以点击顶部菜单的”保存“按钮，进行保存，以免后续忘记保存导致设计内容丢失。

## 页面布局

点击左侧的报表设计菜单，进入报表设计页， 在开始设计前，我们先规划整个页面的布局，首先我们设置页面的整体大小，根据效果图， 我们设置页面最大宽度为 996px，最小宽度为 468px，页面高度设置为 2000px, 保证在 PC 和移动端显示效果保持基本的一致，如图：

![](/assets/2021-08-24-14-29-57-image.png)

![](/assets/2021-08-24-15-50-57-image.png)

然后开始定义布局格式，按如图所示操作：

1. 拖拽”响应式栅格布局“组件到页面面板中

![](/assets/2021-08-24-14-22-21-image.png)

2. 第一个栅格为标题栏，我们将第一个栅格为全宽，栅格一行被划分为 24 格，全宽即将所有屏幕都设置为 24，高度为 100px,如图：
   
   ![](/assets/2021-08-24-14-37-08-image.png)
   
   ![](/assets/2021-08-24-14-37-42-image.png)
   
   依次类推，设置其他栅格布局，分别如下：
   
   | 栅格   | 中屏（≥992px） | 中小屏（≥768px） | 高度    | 内间距  |
   | ---- | ---------- | ----------- | ----- | ---- |
   | 栅格 1 | 24         | 24          | 100px | 0px  |
   | 栅格 2 | 24         | 24          | 60px  | 10px |
   | 栅格 3 | 12         | 24          | 300px | 10px |
   | 栅格 4 | 12         | 24          | 300px | 10px |
   | 栅格 5 | 24         | 24          | 500px | 10px |
   | 栅格 6 | 24         | 24          | 300px | 10px |
   | 栅格 7 | 24         | 24          | 300px | 10px |
   | 栅格 8 | 24         | 24          | 300px | 10px |
   | 栅格 9 | 24         | 24          | 300px | 10px |
   
   设置完成后，效果如图：
   
   ![](/assets/2021-08-24-15-01-19-image.png)
   
   ## 栅格 1：页面标题
   
   拖拽”富文本“组件到栅格 1 中，点击添加按钮添加”H“标题，输入”第一次全国人口普查“，输入完成后，点击右侧的菜单按钮，修改为 H2，并设置组件的样式，如图所示：
   
   ![](/assets/2021-08-24-14-44-25-image.png)
   
   ![](/assets/2021-08-24-14-45-25-image.png)
   
   ![](/assets/2021-08-24-14-43-48-image.png)

## 栅格 2：人口总数

1. 拖拽”卡片“组件到栅格 2 中，拖拽”第七次全人口普查“表的”人口数“列到数据栏的”值“下，并重命名为”全国总人口数：“, 同时合并规则勾选为“求和”，如图：

![](/assets/2021-08-24-15-08-14-image.png)

2. 在”配置“区，设置”画版区域”样式，将背景色设置为透明，文字颜色调整为深灰色，如图：
   
   ![](/assets/2021-08-24-15-12-49-image.png)
   
   3. 设置“卡片”下的样式，内容靠左排列，如图：
      
      ![](/assets/2021-08-24-15-14-58-image.png)
   
   4. 设置“卡片项 1”的“值样式”，将文字颜色调整成红色，如图：
   
   ![](/assets/2021-08-24-15-16-27-image.png)
   
   ## 栅格 3：性别分布饼图
   
   在设计性别分布饼图前，我们先注意下“第七次全国人口普查”表中，性别 男和女分别以列的形式体现的， 但我们组件中是需要横向的数据格式的， 需要的数据格式类似如下：
   
   | 性别  | 人数  |
   | --- | --- |
   | 男   | 51  |
   | 女   | 49  |
   
   所以此处我们需要对数据进行转换，点击左侧表格菜单项，进入数据处理页，如图：
   
   ![](/assets/2021-08-24-15-24-21-image.png)

此时点击“新建表”按钮，在“名称”栏填写“第七次人口普查（列转行）”，在“公式”栏填写

```
DataHu.util.columnToRows(DataHu.tables['第七次全国人口普查'], ['男（%）',
       '女（%）', '0—14岁（%）', '15—59岁（%）', '2010年比重（%）', '2020年比重（%）', '60岁及以上（%）',
       '65岁及以上（%）', '大学（大专及以上）（人/10万人）', '高中（含中专）（人/10万人）',
        '初中（人/10万人）', '小学（人/10万人）', '受教育年限2010年', '受教育年限2020年'], '类别', '比值')
```

以上公式的作用是将表格的列转为行，但次数我们获取的“比值”列是百分比值，不能进行汇总相加，所以我们还需将比值转成对应的值，点击“新建栏目”，按截图分别设置相关信息，公式栏设置为：

```
row['比值'] / 100 * row['人口数']
```

如图：

![](/assets/2021-08-24-15-39-09-image.png)

数据处理完成后，我们回到报表设计页，将“饼图”组件拖拽到栅格 3，分别拖拽“第七次人口普查（列转行）”表的 “类别”列到数据栏的分组和图表过滤下， “值”列到数据栏的值下， 图表过滤勾选“男（%）”和“女（%）”， 如图：

![](/assets/2021-08-24-15-43-06-image.png)

## 栅格 4：年龄分布饼图

同栅格 3，将“饼图”组件拖拽到栅格 4，分别拖拽“第七次人口普查（列转行）”表的 “类别”列到数据栏的分组和图表过滤下， “值”列到数据栏的值下， 图表过滤勾选“0-14 岁（%）”、“15-59 岁（%）”和“60 岁及以上（%）”， 如图：

![](/assets/2021-08-24-15-47-05-image.png)

## 栅格 5：人口分布密度地图

将“密度地图”组件拖拽到栅格 5，分别拖拽“地区行政名称映射”表的“行政名称”列到数据栏的分组，“第七次人口普查”表的“人口数”列到数据栏的值下，如图所示：

![](/assets/2021-08-24-15-54-33-image.png)

此时地图已显示出来，下一次我们需要对地图的颜色进行划分定义，点击配置面板的“视觉映射 1”，勾选“显示手柄标签”，映射类型调整为“分段行”，点击精确分段的添加按钮，分别添加一下分段

| 最小值       | 最大值       | 名称    | 颜色      |
| --------- | --------- | ----- | ------- |
| 100000000 | 200000000 | >1 亿  | #FF2E42 |
| 50000000  | 100000000 | >5 千万 | #FF838E |
| 30000000  | 50000000  | >3 千万 | #FFAFB7 |
| 10000000  | 30000000  | >1 千万 | #FFEEEA |
| 0         | 10000000  | <1 千万 | #EFF1FF |

如图：

![](/assets/2021-08-24-16-07-40-image.png)

## 栅格 6：地区人口数排名柱状图

将“柱状图”组件拖拽到栅格 6，分别拖拽“第七次人口普查”表的“区域”列到数据栏的分组，“第七次人口普查”表的“人口数”列到数据栏的值下， 同时设置“图形 1”下“动态排序选项”，如图：

![](/assets/2021-08-24-16-14-00-image.png)

此时图中 x 轴的文字标签显示不全，我们需要设置“x 轴”的“标签显示间隔” 为“显示所有标签”， “刻度标签旋转的角度”为“90”， 如图：

![](/assets/2021-08-24-16-17-52-image.png)

## 栅格 7：人口增长曲线

将“线性图”组件拖拽到栅格 7，分别拖拽“全国人口普查或总表”表的“年度”列到数据栏的分组，“全国人口普查或总表”表的“人口数”列到数据栏的值下，如图：

![](/assets/2021-08-24-16-20-04-image.png)

## 栅格 8：增长率、性别比、城乡人口比增长曲线

将“线性图”组件拖拽到栅格 8，分别拖拽“全国人口普查或总表”表的“年度”列到数据栏的分组，“全国人口普查或总表”表的“年均增长率”、“性别比”、“城乡人口比”列到数据栏的值下，如图：

![](/assets/2021-08-24-16-25-12-image.png)