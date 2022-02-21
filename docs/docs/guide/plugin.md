# 插件

Data Hu 插件功能， 用于解决在现有功能组件无法满足您的需要时，您可以通过插件功能开发自定义的可视化组件。

## 插件开发

1. 您可以从 github 下载查看开发项目模板，在该模板基础上开发您需要的组件，模板初始化如下：

```
git@github.com:datahu-cn/component-template.git
cd component-template
yarn
yarn dev
```

2. 模板初始化完成后，在 dist 文件夹下会生成 index.es.js 文件，使用 Data Hu 报表设计功能可以代开该文件，如图所示：
   
   ![](/assets/2022-02-19-13-35-55-image.png)

3. 导入 index.es.js 文件后，在左上角组件区域将新增导入的组件图标，您可以和使用其他标准组件一样，拖拽使用该组件，如图：
   
   ![](/assets/2022-02-19-13-38-17-image.png)

## 插件发布

1. 在插件项目执行编译命令，可在 dist 文件生成发布后的 index.es.js 文件，命令如下
   
   ```
   yarn build
   ```

2. 打开 Data Hu 报表设计工具，进入”选项“菜单，在可视化插件栏下，点击添加插件，可将插件导入设计工具中，后续即可在组件中使用该插件进行设计工作，如图：
   
   ![](/assets/2022-02-19-13-43-54-image.png)

## 插件使用注意事项

1. 请注意修改插件的名称和插件中可视化组件的名称，名称要求唯一，而且不能和标准组件名称相同，插件明和和组件名称修改位置如下：
   
   ```
   export let plugin: IComponentPlugin = {
     name: 'demo-line-plugin', // 插件名称，插件名称不能和其他插件名称相同
     description: 'demo line plugin description',
     version: '1.0.0',
     // 属性值为组件名称，一个插件下可定义多个组件，组件名称不能和标准组件名称相同
     components: {DemoLineChartComponent}
   }
   ```

2. 开发模式下，设计的报表发布后，插件无法使用，需将插件发布然后导入到设计工具中。
