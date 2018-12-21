* [整体布局](#整体布局)
* [表单数据](#表单数据)

## 整体布局
```
<Form>
    <Row>
        <Col>
            <FormItem>
                <Input/>
            </FormItem>
        </Col>
        <Col>
            <FormItem>
                <Button/>
            </FormItem>
        </Col>
    </Row>
</Form>
```
1. 整体布局如上所示 Form为整体表单的容器 为了实现栅格系统布局 将所有表单项放在Row组件下 
2. Row组件将每一行分为24格 Col为Row下面的子容器 宽度由span指定为0-24 这样就可以随意控制表单项的宽度了
3. FormItem为表单项组件 表单项组件里才是用户真正定义的组件
4. 说明这个布局方式是为了让用户了解组件的整体布局方式 不了解也不影响使用

## 表单数据

```
// 组件数据 Object
options: {
  // 表单属性 非必需
  formProps:{},
  // 布局方式 非必需
  rowProps: {},
  // 表单数据 必需
  formData: {},
  // 表单项组件数据 必需
  formItem: [],
  // 验证成功回调函数, 必需, 返回参数为表单数据
  success(formData) {},
  // 验证失败回调函数，非必需，返回参数为表单数据
  fail(formData) {},
}

```

* #### options数据

| 属性 | 说明	| 类型 | 默认值 | 必需 |
| --- | ---- | ----- | ---- | ----- |
| formProps | 整个表单的属性 | Object | - | false |
| rowProps | 表单的布局属性 | Object | - | false |
| formData | 表单的数据 | Object | - | true |
| formItem | 表单项的数据 | Array | - | true |
| success | 表单验证成功回调 | Function | - | true |
| fail | 表单验证失败回调 | Function | - | false |

* ####formProps

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|inline	|是否开启行内表单模式	|Boolean	|false|
|label-position	|表单域标签的位置，可选值为 left、right、top	|String	|right|
|label-width	|表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值|	Number	|-|
|show-message	|是否显示校验错误信息	|Boolean	|true|
|autocomplete	|原生的 autocomplete 属性，可选值为 off 或 on	|String|	off|


* ####rowProps

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|gutter	|栅格间距，单位 px，左右平分|	Number|	0|
|type	|布局模式，可选值为flex或不选，在现代浏览器下有效	|String|	-|
|align	|flex 布局下的垂直对齐方式，可选值为top、middle、bottom|	String|	-|
|justify	|flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between|	String|	-|
|class-name	|自定义的class名称	|String|	-|

* ####formData
表单数据是你要监听的数据
假如你有一个登陆页 有两个数据你是必需的 account和pwd
那么你要在formData里定义
```
formData: {
    // 初始值为空
    accout: '',
    pwd: '',
}
```
然后在formItem里定义两个Input组件
```
formItem: [
    {
        type: 'input',
        key: 'accout',
    },
    {
        type: 'input',
        key: 'pwd',
    },
]
```
这样才能实现数据监听

* #### formItem
```
formItem: [
    {
        type: 'input',
        ...
    }
]
```
formItem的子项为具体的组件属性

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|label-for	|指定原生的 label 标签的 for 属性，配合控件的 element-id 属性，可以点击 label 时聚焦控件。	|String|	-|
|error	|表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息	|String|	-|
|show-message	|是否显示校验错误信息	|Boolean|	true|
|key | 与表单数据对应键值绑定 | String | - |
|label	|标签文本	|String	|-|
|rules	|表单验证规则	|Object \| Array	|-|
|span	|栅格的占位格数，可选值为0~24的整数，为 0 时，相当于display:none|	Number \| String|	-|
|order	|栅格的顺序，在flex布局模式下有效	|Number \| String	|-|
|offset	|栅格左侧的间隔格数，间隔内不可以有栅格	|Number \| String	|-|
|push	|栅格向右移动格数	|Number \| String|	-|
|pull	|栅格向左移动格数	|Number \| String	|-|
|class-name	|自定义的class名称	|String	|-|
|xs	|<768px 响应式栅格，可为栅格数或一个包含其他属性的对象	|Number \| Object	|-|
|sm	|≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	|Number \| Object	|-|
|md	|≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	|Number \| Object	|-|
|lg	|≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	|Number \| Object	|-|
|props | 组件属性 | Object | - |
|events | 组件事件 | Object | - |
|slot | 组件插槽 | String | - |
|type | 组件的类型 | String | - |
|children | 组件的子项 | Array | - |
|text | 组件文本内容 | String | - |
