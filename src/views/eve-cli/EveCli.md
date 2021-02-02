# eve-cli
`Eve CLi` 是一个基于 `Vue.js` 进行快速开发的完整系统，提供： 通过 `@eve/cli` 实现干净极简的项目脚手架，开箱即用。 内置了简单的模板，可自定义添加和删除模板。 默认模板里集成了： 
```js
 eve-ui 组件 
 自定义基于axios/flyio封装的的request请求类库 
 顶部导航，左边菜单，中间布局，面包屑，页签等基础布局，做好了基础建设，无需再搭建框架，可直接快速开发业务。 
```
`Eve CLi` 致力于将 `Vue` 生态中的工具基础标准化。它帮你搭建好了基础框架，提供些公用类库，这样你可以专注在撰写应用上，而不必花好几天再去写基础布局，搭建基础框架，纠结配置等问题。
# 安装

```js
npm i @eve/cli -g
```
> tips：下载的镜像地址和eve-ui的地址一样，可参考eve-ui的安装步骤，[参考链接](http://192.168.208.9:9080/eve-ui/#/install)。

# 使用

#### 查看版本

```js
eve -V
```
> tips：可以用这条命令来测试是否已经安装成功。

#### 创建工程

``` js
eve create[模板名][自定义工程名]
//示例
eve create eve-element-admin eve-admin
```
> tips : 当前内置的模板有 `eve-element-admin` , 创建工程可用 `eve create eve-element-admin 自定义工程名` , 模板名不可随意填写，只能填写自己添加的或者内置的模板名，工程名可自定义。

#### 添加模板

``` js
eve add
```

#### 删除模板

``` js
eve delete
```

#### 查看模板列表

``` js
eve list
```