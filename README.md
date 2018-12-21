# vue-generate-form
## 简介
Vue动态生成表单组件 可以根据数据配置表单 使用的UI库是iView 整体组件布局方式借鉴了[form-create](https://github.com/xaboy/form-create)的写法 在此表示感谢

## 使用
### 在单文件组件中引用
```
npm i vue-generate-form
```

```
import iView from 'iview'
import VueGenerateForm from 'vue-generate-form'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(VueGenerateForm)
```
```
<template>
    <div id="app">
        <VueGenerateForm :options="options"/>
    </div>
</template>
```

### 在HTML文件中直接引用
使用的是dist目录中的vue-generate-form.js
```
<link rel="stylesheet" type="text/css" href="iview.css">
```
```
<div id="app">
    <vue-generate-form :options="options"/>
    // 或者
    <VueGenerateForm :options="options"/>
</div>
```
```
<script src="vue.js"></script>
<script src="iview.js"></script>
<script src="vue-generate-form.js"></script>
```

## 文档完善中...
