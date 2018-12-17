# vue-generate-form

* [input输入框](#input输入框)

## input输入框
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
