# 自定义代码

自定义代码功能在多个地方可用， 包括新建栏目、新建表、过滤器、栏目格式化、栏目汇总方式、事件以及部分组件的配置属性中。自定义代码实际为一段 Javascript 代码，常见的 Javascript API 可直接使用,可参见文档[[JavaScript 指南 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)], 另外还包括 DataHu 提供的全局 API 和当前上下文信息。

## 全局 API

### DataHu

所有全局 API 都在 DataHu 对象上。

#### tables

存储所有表格数据的对象

DataHu.tables['表格名称']： 获取指定表格名称的所有数据数组

DataHu.tables['表格名称'][0]：获取指定行数据，行从 0 开始

DataHu.tables['表格名称'][0]['栏目名称']：获取指定行、指定栏目的值

#### user

当前登录用户信息

DataHu.user.id ：用户编号

DataHu.user.mobile ：用户手机号

DataHu.user.email ：用户邮箱

DataHu.user.name ：用户名称

DataHu.user.avatar ：用户头像, 此处为头像文件 id，头像地址为：https://datahu.cn/file/download/{DataHu.user.avatar}/

#### roles

当前登录用户的角色名称数组，值示例： ['发布者', '查看者']

#### parameter

上下文参数信息

DataHu.parameter.query['参数名称'] : url 地址上的参数信息

#### formula

DataHu.formula.eq(a, b): 是否相等，等价于 a==b, 返回 boolean

DataHu.formula.notEq(a, b): 是否相等，等价于 a!= b, 返回 boolean

DataHu.formula.gt(a, b): 是否大于，等价于 a > b, 返回 boolean

DataHu.formula.gtOrEq(a, b): 是否大于等于，等价于 a >= b, 返回 boolean

DataHu.formula.lt(a, b): 是否小于，等价于 a < b, 返回 boolean

DataHu.formula.ltOrEq(a, b): 是否小于或等于，等价于 a < = b, 返回 boolean

DataHu.formula.isNull(a): a 是否为空, 返回 boolean

DataHu.formula.isNotNull(a): a 是否不为空, 返回 boolean

DataHu.formula.contains(a, b): a 是否包含 b，不区分大小写, 返回 boolean

DataHu.formula.notContains(a, b): a 是否不包含 b，不区分大小写， 返回 boolean

DataHu.formula.startsWith(a, b): a 是否以 b 开头，区分大小写， 返回 boolean

DataHu.formula.notStartsWith(a, b): a 是否不以 b 开头，区分大小写， 返回 boolean

DataHu.formula.in(a, b): a 是否在数组 b 中， 返回 boolean

DataHu.formula.distinct(items, field=''): 集合 items 的唯一值集合，去除了集合中的重复值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.distinctCount(items, field=''): 唯一计数， 排除了重复值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.count(items): 集合 items 的数量

DataHu.formula.sum(items, field=''): 求和

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.max(items, field=''): 求最大值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.min(items, field=''): 求最小值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.first(items, field=''): 集合的第一个值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.last(items, field=''): 集合的最后一个值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.avg(items, field=''): 求平均值

field: 可选参数，如果 field 不指定，判断标准是集合的元素自身， 如果 field 指定，判断标准书集合元素的属性 field

DataHu.formula.collection(items, field): 返回集合元素中，属性 field 的值的集合

#### formatter

格式化

DataHu.formatter.format(code, value): 对值 value 进行格式化，格式化代码为 code，例如： DataHu.formatter.format('0.00%', 20), code 格式参见[https://customformats.com/](https://customformats.com/)

DataHu.formatter.formatHtml(code, value) : 方法同 format，只是在 format 基础上增加了颜色的格式化

#### util

DataHu.util.groupBy(value: Array< any >, props: Array< any > | string | Function)

对集合 value 进行分组，

props：string 指定进行分组的栏目名称, 指定栏目相等时为同一组

props: Array< any > 指定多个栏目名称， 指定的所有栏目都相等时才为同一组

props: Function 自定义元素的匹配规则，参数为参与比较的 2 个元素，返回 boolean 值

DataHu.util.orderBy(arr: Array< any >, pro: string, desc: boolean = false)

对集合 arr 进行排序

pro 指定进行排序的栏目名称, 指定栏目相等时为同一组

desc: boolean 是否降序排列，默认为升序排列

DataHu.util.orderByMultiple(arr: Array< any >, orders: Array< any >)

对集合 arr 进行多栏目排序

orders: Array 为进行排序的栏目集合，格式为 [{pro: 栏目名称， desc: 是否降序}]

DataHu.util.orderBy(arr: Array, pro: string, desc: boolean = false)

对集合 arr 进行排序

props：string 指定进行排序的栏目名称, 指定栏目相等时为同一组

desc: boolean 是否降序排列，默认为升序排列

DataHu.util.copy(v: any)

对 v 进行复制，只复制属性值， 不包括方法

DataHu.util.cloneTo(from: any, to: any, deep: boolean = false)

将对象 from 所有属性值 克隆到 to

deep:boolean 是否进行深度克隆， 如果是，如果 from 的属性自身也是一个对象，则递归克隆其属性

DataHu.util.filter(items: Array< any >, expression: any | Function)

对集合 items 进行过滤

expression:any 匹配属性对象，格式为{ [属性名称]: 属性值 }， 当集合元素中的属性和 expression 中的所有属性相等时才通过

expression:Function: 自定义匹配规则，参数为元素本身，返回 boolean 值

DataHu.util.assignTo(from: any,to: any,deep: boolean = false)

当 to 的属性值为空或为定义时，将对象 from 的值克隆给 to

deep:boolean 是否进行深度克隆， 如果是，如果 from 的属性自身也是一个对象，则递归克隆其属性

DataHu.util.uniqueId(prefix?: string)

生成一个唯一的字符串，字符串由时间戳和随机数字组成

prefix?: string： 唯一字符串的前缀

DataHu.util.sequence()

生成有序数字字符串

DataHu.util.format (result: string, ...args: any)

格式化字符串，例如：

DataHu.util.format('hello {name1} word {name2} ', {name1: 'john', name2: 'bill'})， 等价于：DataHu.util.format('hello {0} word {1} ', 'john', 'bill')

DataHu.util.Url.query(url: string, decode: boolean = false)

解析 url 字符串，返回 url 参数对象

decode:boolean 是否解码参数值

DataHu.util.Url.setQuery(url: string, params: any, encode: boolean = false)

给 url 添加参数

encode:boolean 是否编码参数值

DataHu.util.loadScript(url: any)

加载 Javascript，该函数为异步函数，返回 Promise 对象

DataHu.util.top(items: Array< any >,number: number,pro: string = '',desc: boolean =false)

返回集合 items 的前几个元素，数量由 number 指定

pro:string 返回元素前是否对集合进行排序，指定排序的栏目

desc: boolean 是否降序排列，默认为升序排列

## 新建栏目

新建栏目代码位置如图所示：

![](/assets/2021-08-30-13-49-25-image.png)

局部可用参数

row: 表格当前计算行的数据， row['栏目名称'] 可获取指定栏目的值

table: 表格数据数组， table[number] 可获取指定行数据

## 新建表

新建表代码位置如图所示：

![](/assets/2021-08-30-13-56-22-image.png)

无局部可用参数

## 过滤器

过滤器代码位置如图所示：

![](/assets/2021-08-30-13-57-30-image.png)

局部可用参数：

row: 表格当前计算行的数据， row['栏目名称'] 可获取指定栏目的值

## 格式化

格式化代码位置如图所示：

![](/assets/2021-08-30-14-13-33-image.png)

局部可用参数：

value: 当前需要格式化的值

## 栏目汇总方式

栏目汇总方式代码位置如图所示：

![](/assets/2021-08-30-14-15-25-image.png)

局部参数

rows: 将要合并的对象集合

column：将要合并的栏目名称

行条件背景色：

## 事件

事件代码位置如图所示：

![](/assets/2021-08-30-14-19-41-image.png)

局部参数

chart：当前组件的配置定义对象，包含所有与该组件相关的配置信息

chartData：当前组件的数据相关对象

instance：当前组件的实例

chartState：组件全局上下文状态信息

## 数据表选项

代码位置如图所示：

![](/assets/2021-09-13-12-09-45-image.png)

局部参数

row：当前数据表行的数据对象
