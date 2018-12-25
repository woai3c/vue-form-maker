## 简介
Vue动态生成表单组件 可以根据数据配置表单 使用的UI库是[iView](https://www.iviewui.com/) 整体组件布局方式借鉴了[form-create](https://github.com/xaboy/form-create)的写法 在此表示感谢<br>
在Vue里 一般要用到什么组件或数据 都得提前声明<br>
所以要根据数据来生成表单 只能使用Vue的render函数<br>
要做这一个组件 其实并不难 看一下Vue[官方示例](https://cn.vuejs.org/v2/guide/render-function.html#ad) 再找个UI组件库 差不多就能写出来<br>
如果对项目有兴趣 可以fork或克隆项目 自行研究 <br>
有问题或BUG欢迎提[issues](https://github.com/woai3c/vue-generate-form/issues)


## [文档](https://github.com/woai3c/vue-generate-form/blob/master/doc.md)
## [在线DEMO](https://github.com/woai3c/vue-generate-form/blob/master/demo.md)
## 表单组件
* Input 输入框
* Button 按钮
* Radio 单选框
* Checkbox 多选框
* Icon 图标
* Switch 开关
* Select 选择器
* Slider 滑块
* DatePicker 日期选择器
* TimePicker 时间选择器
* Cascader 级联选择器
* InputNumber 数字输入框
* Rate 评分
* Upload 上传
* ColorPicker 颜色选择器

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
        // 或者 <vue-generate-form :options="options"/>
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
</div>
```
```
<script src="vue.js"></script>
<script src="iview.js"></script>
<script src="vue-generate-form.js"></script>
```
