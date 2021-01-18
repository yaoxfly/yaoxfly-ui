#  快速上手
本节将介绍如何在项目中使用 eve-ui

# 引入 eve-ui
你可以引入整个 eve-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 eve-ui。

## 完整引入

在 main.js 中写入以下内容：

```js
import eveUi from 'eve-ui'
Vue.use(eveUi)
//引入全局样式
import 'eve-ui/lib/eve-ui.css'
```

接着在store目录的index.js文件里引入组件插件里的store

```js
import modules from 'eve-ui/src/store/modules'
export default new Vuex.Store({
  modules: {
    ...modules
  }
})
```

> tips:组件库里`store`不管是完整引入还是按需，都需要引入，否则某些组件的功能会不完整,比如Menu和TagViews等组件的联动功能。

## 按需引入(全局)

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 `babel-plugin-component`：

```
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```js
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "eve-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
接下来，如果你只希望引入部分组件，比如 Tree、Header和Menu组件，那么需要在 main.js 中写入以下内容：

``` js
import { Tree, Header, Menu } from 'eve-ui'
const component = [Tree, Header, Menu]
component.forEach(item => {
  Vue.use(item)
})
//引入全局样式
import 'eve-ui/lib/eve-ui.css'
```

完整组件列表

```js
 { 
   Breadcrumb,
   Container,
   Dialog,
   DropDowntTree,
   Header,
   Main,
   Menu,
   RichText,
   Scroll,
   SelectForm,
   TablePagination,
   TagViews,
   Tree,  
   Upload
  } 
```

## 按需引入(单页面)
有时并不想全局引入组件,这时候可以在页面组件中单独引入需要的组件,那么可以在页面组件的`<script>`标签中写入以下内容：
```js
import EveTree from 'eve-ui/lib/tree'
import 'eve-ui/lib/theme-chalk/tree.css'
export default {
  components: {
    EveTree
  },
}
```

某些组件在不引入全局css的情况样式会有点乱，如果有其他样式问题，可以在`main.js`引入全局样式 
```js
import 'eve-ui/lib/eve-ui.css'
```

在模板上简单使用
```html
<template>
  <div>
     <eve-tree></eve-tree>
  </div>
</template>
```

完整组件列表和引入方式

```js
import Breadcrumb from 'eve-ui/lib/breadcrumb'
import 'eve-ui/lib/theme-chalk/breadcrumb.css'
import Container from 'eve-ui/lib/container'
import 'eve-ui/lib/theme-chalk/container.css'
import Dialog from 'eve-ui/lib/dialog'
import 'eve-ui/lib/theme-chalk/dialog.css'
import DropDownTree from 'eve-ui/lib/drop-down-tree'
import 'eve-ui/lib/theme-chalk/drop-down-tree.css'
import Header from 'eve-ui/lib/header'
import 'eve-ui/lib/theme-chalk/header.css'
import Main from 'eve-ui/lib/main'
import 'eve-ui/lib/theme-chalk/main.css'
import Menu from 'eve-ui/lib/menu'
import 'eve-ui/lib/theme-chalk/menu.css'
import RichText from 'eve-ui/lib/rich-text'
import 'eve-ui/lib/theme-chalk/rich-text.css'
import Scroll from 'eve-ui/lib/scroll'
import 'eve-ui/lib/theme-chalk/scroll.css'
import SelectForm from 'eve-ui/lib/select-form'
import 'eve-ui/lib/theme-chalk/select-form.css'
import TablePagination from 'eve-ui/lib/table-pagination'
import 'eve-ui/lib/theme-chalk/table-pagination.css'
import TagViews from 'eve-ui/lib/tag-views'
import 'eve-ui/lib/theme-chalk/tag-views.css'
import Tree from 'eve-ui/lib/tree'
import 'eve-ui/lib/theme-chalk/tree.css'
import Upload from 'eve-ui/lib/upload'
import 'eve-ui/lib/theme-chalk/upload.css'
export default {
  components: {
    Breadcrumb,
    Container,
    Dialog,
    DropDownTree,
    Header,
    Main,
    Menu,
    RichText,
    Scroll,
    SelectForm,
    TablePagination,
    TagViews,
    Tree,
    Upload
  },
}
```

> tips： 按需引入Menu、Breadcrumb、TagViews暂时无法做到联动，需自己写联动逻辑。全局导入没有问题