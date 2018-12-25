# 文档 

### 由于render函数不支持Vue的v-指令 所以iView的文档中有写明支持v-model的 都不要使用 所有表单数据都必须在formData里定义并设定初始值

* [整体布局](#整体布局)
* [表单数据](#表单数据)
* [表单验证](#表单验证)
* [Input输入框](#Input输入框)
* [Radio单选框](#Radio单选框)
* [Checkbox多选框](#Checkbox多选框)
* [Switch开关](#Switch开关)
* [Select选择器](#Select选择器)
* [Slider滑块](#Slider滑块)
* [DatePicker日期选择器](#DatePicker日期选择器)
* [TimePicker时间选择器](#TimePicker时间选择器)
* [Cascader级联选择](#Cascader级联选择)
* [InputNumber数字输入框](#InputNumber数字输入框)
* [Rate评分](#Rate评分)
* [Upload上传](#Upload上传)
* [ColorPicker颜色选择器](#ColorPicker颜色选择器)

## 整体布局
[iView栅格系统](https://www.iviewui.com/components/grid)<br>
[栅格系统在线DEMO](https://runjs.cn/code/cllq3lvm)
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
4. 给 FormItem 设置属性 label-for 可以指定原生的 label 标签的 for 属性，配合设置控件的 element-id 属性，可以点击 label 时聚焦控件。
5. 说明这个布局方式是为了让用户了解组件的整体布局方式 不了解也不影响使用

[回到顶部↑](#文档)

## 表单数据
[iView表单](https://www.iviewui.com/components/form)<br>
[表单在线DEMO](https://runjs.cn/code/3fapiha3)
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

注意： 在ButtonGroup、Select、RadioGroup、CheckboxGroup这几个组件里 子项的的type和props可以省略 直接写属性
```
{
    type: 'select',
    children: [
        {
            props: {
                label: 'demo1'
            }
        },
        // 也可以这样写
        {
           label: 'demo1'
        },
    ]
},
{
    type: 'buttonGroup',
    label: '按钮组',
    children: [
        {
            props:{
                type: 'primary'
            },
            text: 'btn1',
        },
        // 也可以这样写
        {
            text: 'btn2',
            type: 'info'
        }
    ]
}
```
#### reset按钮可以单独一起 也可以写在submit 
```
submit:{},
reset: {},
或者
submit:{
    reset: {}
}
```
[回到顶部↑](#文档)

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

[回到顶部↑](#文档)

## Input输入框
[input demo](https://runjs.cn/code/qipi5lxb)<br>
更多例子请查看[iView](https://www.iviewui.com/components/input)

### Input props 

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

### Input events 

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

### Input slot (子组件插槽)

|名称	|说明|
|-|-|
|prepend	|前置内容，仅在 text 类型下有效|
|append	|后置内容，仅在 text 类型下有效|
|prefix	|输入框头部图标|
|suffix	|输入框尾部图标|

[回到顶部](#整体布局)

## Radio单选框
[radio demo](https://runjs.cn/code/ljwa76l2)<br>
更多例子请查看[iView](https://www.iviewui.com/components/radio)

### Radio props 

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

### RadioGroup props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|type	|可选值为 button 或不填，为 button 时使用按钮样式	|String|	-|
|size	|尺寸，可选值为large、small、default或者不设置	|String	|-|
|vertical	|是否垂直排列，按钮样式下无效	|Boolean	false|

### RadioGroup events 

|事件名	|说明	|返回值|
|-|-|-|
|on-change	|在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发	|...|

[回到顶部↑](#文档)


## Checkbox多选框
[checkbox demo](https://runjs.cn/code/kfj9msyc)<br>
更多例子请查看[iView](https://www.iviewui.com/components/checkbox)

### Checkbox props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|label	|只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中	|String \| Number \| Boolean	|-|
|disabled	|是否禁用当前项	|Boolean|	false|
|indeterminate	|设置 indeterminate 状态，只负责样式控制|	Boolean|	false|
|size	|多选框的尺寸，可选值为 large、small、default 或者不设置|	String|	-|
|true-value	|选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用|	String, Number, Boolean|	true|
|false-value	|没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用	|String, Number, Boolean	|false|

### Checkbox events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发|	true \| false|

### CheckboxGroup props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|size	|多选框组的尺寸，可选值为 large、small、default 或者不设置	|String|	-|

### CheckboxGroup events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发|	[...]|

[回到顶部↑](#文档)

## Switch开关
[switch demo](https://runjs.cn/code/cmqiwmwg)

更多例子请查看[iView](https://www.iviewui.com/components/switch)
### Switch props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|size	|开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。	|String|	-|
|disabled	|禁用开关	|Boolean	|false|
|true-value	|选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用	|String, Number, Boolean	|true|
|false-value	|没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用	|String, Number, Boolean	|false|
|loading	加载中的开关	|Boolean	|false|

### Switch events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|开关变化时触发，返回当前的状态|true \| false|

### Switch slot (子组件插槽)

|名称	|说明|
| --- | ---- |
|open	|自定义显示打开时的内容|
|close	|自定义显示关闭时的内容|

[回到顶部↑](#文档)

## Select选择器
[select demo](https://runjs.cn/code/8siuqvva)<br>
更多例子请查看[iView](https://www.iviewui.com/components/select)

### Select props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|multiple	|是否支持多选	|Boolean	|false|
|disabled	|是否禁用	|Boolean	|false|
|clearable	|是否可以清空选项，只在单选时有效	|Boolean	|false|
|filterable	|是否支持搜索	|Boolean|	false|
|remote	|是否使用远程搜索	|Boolean	|false|
|remote-method	|远程搜索的方法|	Function|	-|
|loading	|当前是否正在远程搜索	|Boolean	|false|
|loading-text	|远程搜索中的文字提示	|String	|加载中|
|label	|仅在 remote 模式下，初始化时使用。因为仅通过 value 无法得知选项的 label，需手动设置。	|String \| Number \| Array	|空|
|size	|选择框大小，可选值为large、small、default或者不填	|String|	-|
|placeholder	|选择框默认文字|	String|	请选择|
|not-found-text	|当下拉列表为空时显示的内容|	String|	无匹配数据|
|label-in-value|	在返回选项时，是否将 label 和 value 一并返回，默认只返回 value	Boolean	|false|
|placement	|弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end|	String|	bottom-start|
|transfer	|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果|	Boolean	|false|
|element-id	|给表单元素设置 id，详见 Form 用法。|	String|	-|

### Select events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性	|当前选中项|
|on-query-change	|搜索词改变时触发|	query|
|on-clear	|点击清空按钮时触发|	无|
|on-open-change	|下拉框展开或收起时触发|	true / false|

### Option props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|label	|选项显示的内容，默认会读取 slot，无 slot 时，优先读取该 label 值，无 label 时，读取 value。当选中时，选择器会显示 label 为已选文案。大部分情况不需要配置此项，直接写入 slot 即可，在自定义选项时，该属性非常有用。|	String|	-|
|disabled	|是否禁用当前项|	Boolean	|false|

### OptionGroup props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|label	|分组的组名|	String|	空|

[回到顶部↑](#文档)

## Slider滑块
[slider demo](https://runjs.cn/code/vn4foexj)<br>
更多例子请查看[iView](https://www.iviewui.com/components/slider)

### Slider props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|min	|最小值	|Number|	0|
|max	|最大值	|Number|	100|
|step	|步长，取值建议能被（max - min）整除|	Number|	1|
|disabled	|是否禁用滑块	|Boolean	|false|
|range	|是否开启双滑块模式|	Boolean|	false|
|show-input	|是否显示数字输入框，仅在单滑块模式下有效	|Boolean	|false|
|show-stops	|是否显示间断点，建议在 step 不密集时使用	|Boolean|	false|
|show-tip	|提示的显示控制，可选值为 hover（悬停，默认）、always（总是可见）、never（不可见）	|String|	hover|
|tip-format	|Slider 会把当前值传给 tip-format，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip	|Function|	value|
|input-size	|数字输入框的尺寸，可选值为large、small、default或者不填，仅在开启 show-input 时有效	|String	|default|

### Slider events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|在松开滑动时触发，返回当前的选值，在滑动过程中不会触发|	value|
|on-input	|滑动条数据变化时触发，返回当前的选值，在滑动过程中实时触发	|value|

## DatePicker日期选择器
[datePicker demo](https://runjs.cn/code/bj7fku7c)<br>
更多例子请查看[iView](https://www.iviewui.com/components/date-picker)

### DatePicker props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|type	|显示类型，可选值为 date、daterange、datetime、datetimerange、year、month	|String|	date|
|format	|展示的日期格式	 |Date	| date \| daterange：<br>yyyy-MM-dd<br>datetime \| datetimerange：<br>yyyy-MM-dd HH:mm:ss<br>year：yyyy<br>month：yyyy-MM|
|placement	|日期选择器出现的位置，可选值为top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end	|String	|bottom-start|
|placeholder	|占位文本	|String|	空|
|options	|选择器额外配置，比如不可选日期与快捷选项，具体项详见下表	|Object|	-|
|split-panels	|开启后，左右面板不联动，仅在 daterange 和 datetimerange 下可用。	|Boolean	|false|
|multiple	|开启后，可以选择多个日期，仅在 date 下可用。	|Boolean	|false|
|show-week-numbers	|开启后，可以显示星期数。	|Boolean	|false|
|start-date	|设置默认显示的起始日期。	|Date	|-|
|confirm	|是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭|	Boolean|	false|
|open	|手动控制日期选择器的显示状态，true 为显示，false 为收起。使用该属性后，选择器不会主动关闭。建议配合 slot 及 confirm 和相关事件一起使用|	Boolean	|null|
|size	|尺寸，可选值为large、small、default或者不设置	|String|	-|
|disabled	|是否禁用选择器|	Boolean	|false|
|clearable	|是否显示清除按钮	|Boolean	|true|
|readonly	|完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效	|Boolean	|false|
|editable	|文本框是否可以输入，只在没有使用 slot 时有效	|Boolean	|true|
|transfer	|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果	|Boolean	|false|
|element-id	|给表单元素设置 id，详见 Form 用法。|	String|	-|
|time-picker-options	|可以在 type 为 datetime 和 datetimerange 下，配置 TimePicker 的属性，比如时间间隔 steps：:time-picker-options="{steps: [1, 10, 10]}"	|Object|	{}|

### options 选择器额外配置

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|shortcuts	|设置快捷选项，每项内容：<br> text \| String：显示的文案<br> value \| Function：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调<br>onClick \| Function：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用|Array|	-|
|disabledDate	|设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天	|Function	|-|


### DatePicker events 

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|日期发生变化时触发	|返回两个值，已经格式化后的日期，比如 2016-01-01，和当前的日期类型，比如 date|
|on-open-change|	弹出日历和关闭日历时触发	|true \| false|
|on-ok	|在 confirm 模式下有效，点击确定按钮时触发	|-|
|on-clear	|在 confirm 模式或 clearable = true 时有效，在清空日期时触发|	-|

### DatePicker slot (子组件插槽)
|名称|	说明|
| --- | ---- |
|无	|自定义选择器的显示内容，建议与 open 等参数一起使用，详见示例|

[回到顶部↑](#文档)


## TimePicker时间选择器
[timePicker demo](https://runjs.cn/code/xoz9p8qj)<br>
更多例子请查看[iView](https://www.iviewui.com/components/time-picker)

### TimePicker props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|type	|显示类型，可选值为 time、timerange	|String|	time|
|format	|展示的时间格式	 |Date	|HH:mm:ss|
|steps	|下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。	|Array|	[]|
|placement	|时间选择器出现的位置，可选值为top top-start top-end bottom bottom-start bottom-end left left-start left-end right right-start right-end	|String	|bottom-start|
|placeholder	|占位文本	|String	|空|
|confirm	|是否显示底部控制栏	|Boolean	|false|
|open	|手动控制时间选择器的显示状态，true 为显示，false 为收起。使用该属性后，选择器不会主动关闭。建议配合 slot 及 confirm 和相关事件一起使用	|Boolean|	null|
|size	|尺寸，可选值为large、small、default或者不设置	|String|	-|
|disabled	|是否禁用选择器	|Boolean	|false|
|clearable	|是否显示清除按钮	|Boolean|	true|
|readonly	|完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效	|Boolean	|false|
|editable	|文本框是否可以输入，只在没有使用 slot 时有效	|Boolean	|true|
|transfer	|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果	|Boolean	|false|
|element-id	|给表单元素设置 id，详见 Form 用法。	|String|	-|

### TimePicker events

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|时间发生变化时触发|	已经格式化后的时间，比如09:41:00|
|on-open-change|弹出浮层和关闭浮层时触发|	true \| false|
|on-ok	|点击确定按钮时触发|	-|
|on-clear	|在清空日期时触发|	-|

### TimePicker slot (子组件插槽)

|名称|	说明|
| --- | ---- |
|无|	自定义选择器的显示内容，建议与 open 等参数一起使用，详见示例|

[回到顶部↑](#文档)


## Cascader级联选择
[cascader demo](https://runjs.cn/code/bvsmbnci)<br>
更多例子请查看[iView](https://www.iviewui.com/components/cascader)

#### 项目提供了内置的省市数据
```
// 定义了一个全局变量cityData 在项目里直接使用cityData即可
// 省 市 县
import 'vue-generate-form/dist/cityData3Level'
// 省 市
import 'vue-generate-form/dist/cityData2Level'
```

### Cascader props 

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|data	|可选项的数据源，格式参照示例说明	|Array|	[]|
|render-format	|选择后展示的函数，用于自定义显示格式	|Function	|label => label.join(' / ')|
|disabled	|是否禁用选择器|	Boolean	|false|
|clearable	|是否支持清除	|Boolean	|true|
|placeholder	|输入框占位符	|String	|请选择|
|trigger	|次级菜单展开方式，可选值为 click 或 hover	|String|	click|
|change-on-select	|当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的示例|	Boolean|	false|
|size	|输入框大小，可选值为large和small或者不填	|String	|-|
|load-data	|动态获取数据，数据源需标识 loading	|Function	|-|
|filterable	|是否支持搜索	|Boolean|	false|
|not-found-text	|当搜索列表为空时显示的内容|	String	|无匹配数据|
|transfer	|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果|	Boolean	|false|
|element-id	|给表单元素设置 id，详见 Form 用法。|	String|	-|

### Cascader events

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|选择完成后的回调，返回值 value 即已选值 value，selectedData 为已选项的具体数据|	value, selectedData|
|on-visible-change	|展开和关闭弹窗时触发	|显示状态，Boolean|

[回到顶部↑](#文档)

## InputNumber数字输入框
[inputNumber demo](https://runjs.cn/code/7t44f6bm)<br>
更多例子请查看[iView](https://www.iviewui.com/components/input-number)

### InputNumber props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|max	|最大值	|Number	|Infinity|
|min	|最小值|	Number	|-Infinity|
|step	|每次改变的步伐，可以是小数|	Number	|1|
|size	|输入框尺寸，可选值为large、small、default或者不填|	String|	-|
|disabled	|设置禁用状态	|Boolean	|false|
|placeholder	|占位文本	|String|	-|
|formatter	|指定输入框展示值的格式	|Function|	-|
|parser	|指定从 formatter 里转换回数字的方式，和 formatter 搭配使用|	Function|	-|
|readonly	|是否设置为只读|	Boolean	|false|
|editable	|是否可编辑|	Boolean	|true|
|precision	|数值精度	|Number|	-|
|element-id	|给表单元素设置 id，详见 Form 用法。	|String|	-|
|active-change	|是否实时响应数据，设置为 false 时，只会在失焦时更改数据	|Boolean	|true|

### InputNumber events

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|数值改变时的回调，返回当前值	|当前值|
|on-focus	|聚焦时触发	|event|
|on-blur	|失焦时触发|	-|

[回到顶部↑](#文档)

## Rate评分
[rate demo](https://runjs.cn/code/rotvxqrt)<br>
更多例子请查看[iView](https://www.iviewui.com/components/rate)

### Rate props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|count	|star 总数	|Number|	5|
|allow-half	|是否允许半选	|Boolean	|false|
|disabled	|是否只读，无法进行交互|	Boolean	|false|
|show-text	|是否显示提示文字	|Boolean	|false|
|clearable	|是否可以取消选择	|Boolean	|false|
|character	|自定义字符|	String|	-|
|icon	|使用图标	|String|	-|
|custom-icon	|使用自定义图标|	String	|-|

### Rate events

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|评分改变时触发|	value|

## Upload上传
[upload load](https://runjs.cn/code/6znoff81)<br>
更多例子请查看[iView](https://www.iviewui.com/components/upload)<br>
注意：组件子项太多的上传组件无法实现 比如iView上传组件最后两个例子

### Upload props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|action	|上传的地址，必填|	String|	-|
|headers	|设置上传的请求头部	|Object|	{}|
|multiple	|是否支持多选文件	|Boolean|	false|
|paste	|是否支持粘贴上传文件	|Boolean	|false|
|data	|上传时附带的额外参数	|Object|	-|
|name	|上传的文件字段名	|String	|file|
|with-credentials	|支持发送 cookie 凭证信息|	Boolean	|false|
|show-upload-list	|是否显示已上传文件列表|	Boolean|	true|
|type	|上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）	|String	|select|
|accept|	接受上传的[文件类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)|	String|	-|
|format	|支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用	|Array	|[]|
|max-size	|文件大小限制，单位 kb	|Number|	-|
|before-upload	|上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传|	Function|	-|
|on-progress	|文件上传时的钩子，返回字段为 event, file, fileList|	Function	|-|
|on-success	|文件上传成功时的钩子，返回字段为 response, file, fileList	|Function|	-|
|on-error	|文件上传失败时的钩子，返回字段为 error, file, fileList|	Function|	-|
|on-preview	|点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据	|Function|	-|
|on-remove	|文件列表移除文件时的钩子，返回字段为 file, fileList|	Function|	-|
|on-format-error	|文件格式验证失败时的钩子，返回字段为 file, fileList|	Function|	-|
|on-exceeded-size	|文件超出指定大小限制时的钩子，返回字段为 file, fileList|	Function|	-|
|default-file-list	|默认已上传的文件列表，例如：[{name: 'img1.jpg',url: \'http://www.xxx.com/img1.jpg\'}] |Array	|[]|

### Upload slot (子组件插槽)

|名称	|说明|
| --- | ---- |
|无|	触发上传组件的控件|
|tip	|辅助提示内容|

[回到顶部↑](#文档)

## ColorPicker颜色选择器
[colorPicker](https://runjs.cn/code/86crymkb)<br>
更多例子请查看[iView](https://www.iviewui.com/components/color-picker)<br>

### ColorPicker props

| 属性 | 说明	| 类型 | 默认值 |
| --- | ---- | ----- | ---- |
|disabled	|是否禁用|	Boolean|	false|
|editable	|是否可以输入色值	|Boolean|	true|
|alpha	|是否支持透明度选择|	Boolean	|false|
|hue	|是否支持色彩选择	|Boolean	|true|
|recommend	|是否显示推荐的颜色预设	|Boolean	|false|
|colors|	自定义颜色预设|	Array|	[]|
|format	|颜色的格式，可选值为 hsl、hsv、hex、rgb	|String	|开启 alpha 时为 rgb，其它为 hex|
|size	|尺寸，可选值为large、small、default或者不设置	|String|	-|

### ColorPicker events

|事件名	|说明	|返回值|
| --- | ---- | ----- |
|on-change	|当绑定值变化时触发|	当前值|
|on-active-change|	面板中当前显示的颜色发生改变时触发	|当前显示的颜色值|
|on-open-change	|下拉框展开或收起时触发|	true / false|

[回到顶部↑](#文档)
