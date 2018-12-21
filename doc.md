* [整体布局](#整体布局)
* [表单数据](#表单数据)
* [表单验证](#表单验证)
* [Input输入框](#Input输入框)
* [Radio单选框](#Radio单选框)

## 整体布局
[iView栅格系统](https://www.iviewui.com/components/grid)
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

[回到顶部](#整体布局)

## 表单数据
[iView表单](https://www.iviewui.com/components/form)
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
  // 提交按钮 必需
  submit:{},
  // 重置按钮 非必需
  reset:{},
}

```

### options数据

| 属性 | 说明	| 类型 | 默认值 | 必需 |
| --- | ---- | ----- | ---- | ----- |
| formProps | 整个表单的属性 | Object | - | false |
| rowProps | 表单的布局属性 | Object | - | false |
| formData | 表单的数据 | Object | - | true |
| formItem | 表单项的数据 | Array | - | true |
| submit | 表单提交按钮 | Object | - | true |
| reset | 表单重置按钮 | Object | - | false |

### formProps

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|inline	|是否开启行内表单模式	|Boolean	|false|
|label-position	|表单域标签的位置，可选值为 left、right、top	|String	|right|
|label-width	|表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值|	Number	|-|
|show-message	|是否显示校验错误信息	|Boolean	|true|
|autocomplete	|原生的 autocomplete 属性，可选值为 off 或 on	|String|	off|


### rowProps

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|gutter	|栅格间距，单位 px，左右平分|	Number|	0|
|type	|布局模式，可选值为flex或不选，在现代浏览器下有效	|String|	-|
|align	|flex 布局下的垂直对齐方式，可选值为top、middle、bottom|	String|	-|
|justify	|flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between|	String|	-|
|class-name	|自定义的class名称	|String|	-|

### formData
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

### formItem
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

[回到顶部](#整体布局)

## 表单验证
在组件里有一个rules属性 可以对属性key绑定的表单数据进行验证
你可以这样使用
```
// 假设你要验证的表单数据为mail
key: 'mail',
rules: [
    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
]

也可以这样使用, 验证表单数据为passwd
key: 'passwd',
rules: [
    {
        trigger: 'blur',
        validator(rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'));
            } else {
                callback();
            }
        };
    }
]
```
如果你只有一条验证规则 可以直接使用对象
```
rules: { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
```
具体验证规则请查看[async-validator](https://github.com/yiminghe/async-validator)

[回到顶部]((#整体布局)

## Input输入框
Input props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|type	|输入框类型，可选值为 text、password、textarea、url、email、date	|String|	text|
|size	|输入框尺寸，可选值为large、small、default或者不设置	|String|	-|
|placeholder	|占位文本	|String|	-|
|clearable	|是否显示清空按钮	|Boolean	|false|
|disabled	|设置输入框为禁用状态	|Boolean	|false|
|readonly	|设置输入框为只读	|Boolean	|false|
|maxlength	|最大输入长度	|Number	|-|
|icon	|输入框尾部图标，仅在 text 类型下有效	|String|	-|
|prefix	|输入框头部图标	|String|	-|
|suffix|	输入框尾部图标	|String|	-|
|search	|是否显示为搜索型输入框|	Boolean|	false|
|enter-button	|开启 search 时可用，是否有确认按钮，可设为按钮文字	|Boolean \| String|	false|
|rows	|文本域默认行数，仅在 textarea 类型下有效	|Number|	2|
|autosize	|自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }	|Boolean \| Object|	false|
|number	|将用户的输入转换为 Number 类型|	Boolean|	false|
|autofocus	|自动获取焦点	|Boolean	|false|
|autocomplete	|原生的自动完成功能，可选值为 off 和 on|	String|	off|
|element-id	|给表单元素设置 id，详见 Form 用法。	|String|	-|
|spellcheck	|原生的 spellcheck 属性	|Boolean	|false|
|wrap	|原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效	|String|	soft|

Input events 

|事件名	|说明	|返回值|
|-|-|-|
|on-enter	|按下回车键时触发	|无|
|on-click	|设置 icon 属性后，点击图标时触发	|无|
|on-change	|数据改变时触发	|event|
|on-focus	|输入框聚焦时触发	|无|
|on-blur|	输入框失去焦点时触发	|无|
|on-keyup	|原生的 keyup 事件	|event|
|on-keydown	|原生的 keydown 事件	|event|
|on-keypress	|原生的 keypress 事件	|event|
|on-search	|开启 search 时可用，点击搜索或按下回车键时触发	|value|

Input slot (子组件插槽)

|名称	|说明|
|-|-|
|prepend	|前置内容，仅在 text 类型下有效|
|append	|后置内容，仅在 text 类型下有效|
|prefix	|输入框头部图标|
|suffix	|输入框尾部图标|

[回到顶部](#整体布局)

## Radio单选框
Radio props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|label	|只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目	|String \| Number	|-|
|disabled	|是否禁用当前项	|Boolean	|false|
|size	|单选框的尺寸，可选值为 large、small、default 或者不设置|	String|	-|
|true-value	|选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用|	String, Number, Boolean|	true|
|false-value	|没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用|	String, Number, Boolean	|false|

Radio events 

|事件名	|说明	|返回值|
|-|-|-|
|on-change	|在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发	|...|

RadioGroup props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|type	|可选值为 button 或不填，为 button 时使用按钮样式	|String|	-|
|size	|尺寸，可选值为large、small、default或者不设置	|String	|-|
|vertical	|是否垂直排列，按钮样式下无效	|Boolean	false|

RadioGroup events 

|事件名	|说明	|返回值|
|-|-|-|
|on-change	|在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发	|...|

[回到顶部](#整体布局)
