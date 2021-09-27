# 连接 Oracle 数据库

## 安装配置 Oracle Instant Client

在开始连接 Oracle 之前，需先完成 Instant Client 的安装与配置。

### Mac

首先下载 [Oracle Instant Client Basic](https://download.oracle.com/otn_software/mac/instantclient/198000/instantclient-basic-macos.x64-19.8.0.0.0dbru.dmg) DMG 安装包，下载完成后，打开 DMG 安装包，并在终端窗口中运行 install_ic.sh 脚本文件，运行完后，在当前下载目录下会出现 instantclient_19_8 文件夹。

### Windows

首先下载 [Oracle Instant Client Basic](https://download.oracle.com/otn_software/nt/instantclient/1911000/instantclient-basic-windows.x64-19.11.0.0.0dbru.zip) 安装包，下载完成后，解压到一个文件夹中，然后将该文件夹路径添加到 path 环境变量中。

更多内容参见：[Developing Node.js Applications for Oracle Database](https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html)

## 连接 Oracle 数据库

进入数据源管理菜单，新建数据源，选择 Oracle， 在打开的弹出框中填写相关信息，如图所示, 如果添加了环境变量，则 Oracle Client 路径属性可以为空：

![](/assets/2021-08-12-18-41-49-image.png)
