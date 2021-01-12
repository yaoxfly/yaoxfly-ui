# 安装

由于在私域 `npm`镜像 下，所以下载组件、插件的时候，会有些变化，请按照步骤来下载组件，否则会下载失败。如果 1、2 两步 之前已经操作过,不需要再重复操作。
第一次 `npm i` 包含`eve-ui`组件的项目，产生不能下载的情况(产生原因:私域镜像不能下载 `npm` 上的包,`npm` 镜像也不能下载私域的包,所以可先下载 `npm` 的包，再下载私域的包)，可在 `package.json` 中把 `eve-ui` 删除或者注释,然后再按以下步骤重新下载，

### 1.全局安装 nrm

```js
npm i nrm -g
```

### 2.添加镜像地址命名为 enpm

```js
nrm add enpm http://192.168.200.127:8081/repository/npm-public/
```

> tips:查看是否已经添加，可以使用`nrm ls`查看

###  3.切换到 enpm 镜像

```js
nrm use enpm
```

###  4.登录到私服

```js
npm login
```

> tips: 账号: admin 、密码: admin123 、邮箱:admin@example.org

###  5.安装 eve-ui

```js
npm i eve-ui
```

> tips: 记得切换回 `npm` 镜像，不然外域的插件无法更新和下载

### 6. eslint校验问题

若安装组件库后发现终端一直输出 eslint 的校验问题，解决方案如下：

在根路径 即 package.json 同级路径建立个.eslintignore 文件

在文件中写入如下内容

```js
node_modules/
dist/
lib/
 *.md
```
> tips：主要lib目录，当期目录不能省略


###  Q问题
当前组件库有用到`sass`，如果有报 `node-sass`、`sass-loader` 未安装，则可执行以下命令安装,如果工程中已经安装请跳过当前步骤。
```js
npm i node-sass  sass-loader --save-dev
```