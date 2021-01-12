#  快速上手
本节将介绍如何在项目中使用 eve-ui

# 引入 eve-ui
你可以引入整个 eve-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 eve-ui。

## 完整引入

在 main.js 中写入以下内容：

```js
import eveUi from 'eve-ui'
Vue.use(eveUi)
```

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
        "style": false
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
import EveTree from 'eve-ui/src/components/tree'
export default {
  components: {
    EveTree
  },
}
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
import Container from 'eve-ui/lib/container'
import Dialog from 'eve-ui/lib/dialog'
import DropDownTree from 'eve-ui/lib/drop-down-tree'
import Header from 'eve-ui/lib/header'
import Main from 'eve-ui/lib/main'
import Menu from 'eve-ui/lib/menu'
import RichText from 'eve-ui/lib/rich-text'
import Scroll from 'eve-ui/lib/scroll'
import SelectForm from 'eve-ui/lib/select-form'
import TablePagination from 'eve-ui/lib/table-pagination'
import TagViews from 'eve-ui/lib/tag-views'
import Tree from 'eve-ui/lib/tree'
import Upload from 'eve-ui/lib/upload'
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