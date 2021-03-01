# 安装

由于在私域 `npm`镜像 下，所以下载组件、插件的时候，会有些变化，请按照步骤来下载组件，否则会下载失败。如果 1、2 两步 之前已经操作过,不需要再重复操作。

> tips:  1. 以下插件包，都基于`node.js`环境，请正确搭建好`node.js`环境，否则安装后可能无法正常使用。如果无法正常使用， 解决方案： [参考链接](https://blog.csdn.net/zixinghuanyue/article/details/100057262)。


### 1.全局安装 nrm

```js
npm i nrm -g
```
### 2.添加镜像地址命名为 enpm

```js
nrm add enpm http://192.168.200.127:8081/repository/npm-public/
```

> tips:查看是否已经添加，可以使用`nrm ls`查看,也可查看其它已经拥有的镜像，如果遇到使用`nrm ls`或其他`nrm`命令失败，可能原因是你的`node`版本过低或过高，支持不了最新版本的`nrm`,需要对`nrm`降级,详细解决方案，看最后面的`Q问题`。

###  3.切换到 enpm 镜像

```js
nrm use enpm
```
###  4.安装 eve-ui

```js
npm i eve-ui
```

> tips: `enpm`镜像可以下载和更新外域的包了，可不需要再切换为`npm`、`taobao`等镜像，如果出现下载外域的包发生错误的情况，就再切换回`npm`、`taobao`等镜像下载。

###  5.安装 element-ui

```js
npm i element-ui 
```
> tips: `eve-ui`基于`element-ui`，所以`element-ui`必须下载

### 6. eslint校验问题

若安装组件库后发现终端一直输出 `eslint` 的校验问题，解决方案如下：

在根路径 即 `package.json` 同级路径建立个 `.eslintignore` 文件

在文件中写入如下内容

```js
node_modules/
dist/
lib/
 *.md
```
> tips：主要`lib`目录，当期目录不能省略


###  Q问题
1.当前组件库有用到`sass`，如果有报 `node-sass`、`sass-loader` 未安装，则可执行以下命令安装,如果工程中已经安装请跳过当前步骤。
```js
npm i node-sass  sass-loader --save-dev
```

2.插件版本更新后，重新下载插件，`package.json`版本已经更新，但内容未更新,解决方案如下：

```js
在node_modules 里找到 eve-ui 删除掉，先关闭编译器再删除，否则有权限问题，删除后再重新 执行 npm i eve-ui 
```

3.使用nrm命令失败，可以下载指定的版本，解决方案如下：
```js
//1.0.0版本是较低的版本，可根据自己的需求更改
npm i nrm@1.0.0 -g
```

4.`npm i`包含`eve-ui`组件的项目，产生不能下载的情况
```js
首先检查是否在enpm的镜像下 如果不是则切换为enpm镜像，再下载，若发现除了eve-ui可以下载，其他组件无法下载则在
package.json 中把 eve-ui 删除或者注释,然后再按以下步骤重新下载，发生这种情况的原因主要是:私域镜像不能下载
npm 上的包,npm 镜像也不能下载私域的包,所以可先下载npm的包，再下载私域的包
```