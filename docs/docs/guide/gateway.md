# 代理网关

Data Hu Gateway , 数据源连接代理网关， 当数据源存储在 Desktop 和 Saas 云端服务无法直接访问的网络下，或因安全考虑不直接对外提供数据源连接是， 可使用代理网关来提供代理服务。

代理网关可支持 Linux、Windows 和 Mac 操作系统，您可下载对应的服务安装包，下载地址如下：

Mac / Linux: https://cdn.datahu.cn/desktop/gateway.tar.bz2

Windows: https://cdn.datahu.cn/desktop/gateway.zip

## 代理网关安装

### Mac / Linux 解压

您可以使用其他工具加压 tar.bz2 或在文件下载目录执行以下命令

```
tar -xvf gateway.tar.bz2
cd gateway
```

### Windows 解压

您可以手动解压 zip 或在文件下载目录执行以下命令

```
powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('gateway.zip', 'gateway'); }"
cd gateway
```

### 运行

```
node dist/main -port 3000 -secret "xx your secret"
```

如果您想使用 ssl，使用以下命令运行：

```
node dist/main -port 3000 -secret "xx your secret" -https "ssl key" "ssl crt"
```

> -port: 网关服务使用的端口号， 默认 3000
>
> -secret： 网关密钥， 默认 datahu
>
> -https: 如果启用 ssl，需设置 ssl 证书 key 和 crt 的文件路径， 默认不启用 ssl

命令执行完后，浏览器中输入 http://127.0.0.1:3000, 具体地址根据您设置的设置相应调整，访问效果如图：

![](/assets/2021-09-26-12-28-29-image.png)

## 代理网关的使用

我们以 MySql 数据库的连接为例进行说明，在报表设计器 Data Hu Desktop 的数据源菜单下，编辑数据源时， 可选择开启代理网关，如图：

![](/assets/2021-09-26-12-31-38-image.png)

设计时：表示代理网关只在报表设计器中生效

发布后：表示代理网关只在发布到 Saas 或自身的私有云平台后生效

代理网关地址：输入代理网关的地址，根据自身的配置确定

代理网关密钥：运行代理网关时设置的密钥
