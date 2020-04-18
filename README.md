# vue-form-maker 

### 简介
Vue动态生成表单组件 可以根据数据配置表单 使用的UI库是[iView](https://www.iviewui.com/) <br>
在Vue里 一般要用到什么组件或数据 都得提前声明<br>
所以要根据数据来生成表单 只能使用Vue的render函数<br>
要做这一个组件 其实并不难 看一下Vue[官方示例](https://cn.vuejs.org/v2/guide/render-function.html#ad) 再找个UI组件库 差不多就能写出来<br>
如果对项目有兴趣 可以fork或克隆项目 自行研究 <br>
有问题或BUG欢迎提[issues](https://github.com/woai3c/vue-form-maker/issues)


## [文档](https://github.com/woai3c/vue-form-maker/blob/master/doc.md)
## [在线DEMO](https://github.com/woai3c/vue-form-maker/blob/master/demo.md)
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
npm i vue-form-maker
```

```
import VueFormMaker from 'vue-form-maker'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// 如需使用城市数据 可以这样引用
// 省 市 县
import 'vue-form-maker/dist/cityData3Level'
// 省 市
import 'vue-form-maker/dist/cityData2Level'
// 城市数据文件定义了一个全局变量cityData 在项目里直接使用cityData即可

Vue.use(ViewUI)
Vue.use(VueFormMaker)
```
```
<template>
    <div id="app">
        <VueFormMaker :options="options"/>
        // 或者 <vue-form-maker :options="options"/>
    </div>
</template>
```

### 在HTML文件中直接引用
使用的是dist目录中的`vue-form-maker.js`
```
<link rel="stylesheet" type="text/css" href="iview.css">
```
```
<div id="app">
    <!-- 在 HTML 中使用组件要这样使用，不能这样用 <vue-form-maker :options="options"/>，否则后面的元素渲染不出来 -->
    <vue-form-maker :options="options"></vue-form-maker>
</div>
```
```
<script src="vue.js"></script>
<script src="iview.js"></script>
<script src="vue-form-maker.js"></script>
```

### 如果对你有帮助，请给个Star
