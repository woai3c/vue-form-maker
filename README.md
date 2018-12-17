# vue-generate-form
* [Form表单][#Form表单]
* [Input输入框](#Input输入框)


## Form表单
#### Form props
|属性| 说明 | 类型 | 默认值 |
| --- | --- | ---- | --- |
|inline|	是否开启行内表单模式|	Boolean	|false|
|label-position|	表单域标签的位置，可选值为 left、right、top|	String|	right|
|label-width|	表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值|	Number|	-|
|show-message|	是否显示校验错误信息|	Boolean	|true|
|autocomplete|	原生的 autocomplete 属性，可选值为 off 或 on|	String|	off|

#### FormItem props
|属性| 说明 | 类型 | 默认值 |
| --- | --- | ---- | --- |
|prop|	对应表单域 model 里的字段|	String|	-|
|label|	标签文本	|String|	-|
|label-width|	表单域标签的的宽度|	Number|	-|
|label-for|	指定原生的 label 标签的 for 属性，配合控件的 element-id 属性，可以点击 label 时聚焦控件。|	String|	-|
|required|	是否必填，如不设置，则会根据校验规则自动生成|	Boolean|	-|
|rules	|表单验证规则	|Object \| Array|	-|
|error|	表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息	|String|	-|
|show-message	|是否显示校验错误信息	|Boolean	|true|
#### FormItem slot
|属性| 说明 |
| --- | --- |
|label	|label 内容|


## Input输入框
#### Input props
|属性| 说明 | 类型 | 默认值 |
| --- | --- | ---- | --- |
|type	|输入框类型，可选值为 text、password、textarea、url、email、date|	String|	text|
|value	|绑定的值，可使用 v-model 双向绑定	|String \| Number|	空|
|size	|输入框尺寸，可选值为large、small、default或者不设置	|String|	-|
|placeholder	|占位文本|	String|	-|
|clearable	|是否显示清空按钮|	Boolean|	false|
|disabled	|设置输入框为禁用状态|	Boolean|	false|
|readonly	|设置输入框为只读|	Boolean|	false|
|maxlength	|最大输入长度|	Number|	-|
|icon	|输入框尾部图标，仅在 text 类型下有效|	String|	-|
|prefix	|输入框头部图标|	String|	-|
|suffix|	输入框尾部图标|	String|	-|
|search	|是否显示为搜索型输入框|	Boolean|	false|
|enter-button	|开启 search 时可用，是否有确认按钮，可设为按钮文字|	Boolean \| String|	false|
|rows	|文本域默认行数，仅在 textarea 类型下有效|	Number|	2|
|autosize	|自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }|	Boolean \| Object|	false|
|number	|将用户的输入转换为 Number 类型|	Boolean	|false|
|autofocus	|自动获取焦点|	Boolean|	false|
|autocomplete	|原生的自动完成功能，可选值为 off 和 on|	String|	off|
|element-id	|给表单元素设置 id，详见 Form 用法。	|String|	-|
|spellcheck	|原生的 spellcheck 属性|	Boolean	|false|
|wrap	|原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效|	String|	soft|

#### Input events 
|事件名| 说明 | 返回值|
| --- | --- | ---- |
|on-enter|	按下回车键时触发|	无|
|on-click|	设置 icon 属性后，点击图标时触发|	无|
|on-change|	数据改变时触发|	event|
|on-focus|	输入框聚焦时触发|无|
|on-blur	|输入框失去焦点时触发	|无|
|on-keyup|	原生的 keyup 事件|	event|
|on-keydown|	原生的 keydown 事件|	event|
|on-keypress|	原生的 keypress 事件|	event|
|on-search|	开启 search 时可用，点击搜索或按下回车键时触发|	value|


#### Input slot 
|事件名| 说明 |
| --- | --- |
|prepend	|前置内容，仅在 text 类型下有效|
|append|	后置内容，仅在 text 类型下有效|
|prefix|	输入框头部图标|
|suffix|	输入框尾部图标|
