###  使用 eve-ui

```js
//main.js
import eveUi from 'eve-ui'
Vue.use(eveUi)
```

### Q 问题

若安装组件库后发现这个组件库有 eslint 校验问题的解决：

在根路径 即 package.json 同级路径建立个.eslintignore 文件

在文件中写入如下内容

```js
node_modules
 dist/
 *.md
```

