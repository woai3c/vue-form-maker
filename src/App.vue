<template>
    <div id="app">
        <VueForm :options="options"/>
    </div>
</template>

<script>
import VueForm from './components/VueForm'

export default {
    name: 'App',
    data() {
        return {
            options: {
                data: [
                    {
                        label: '账号',
                        type: 'input',
                        key: 'userName',
                        attrs: {
                            name: 'user',
                            type: 'text',
                            placeholder: '请输入用户名',
                        },
                        value: 'test',
                        rules: {
                            type: 'string',
                            required: true,
                            min: 6,
                            max: 10,
                            message: '长度必须在6到10个字符',
                        }
                    },
                    {
                        type: 'submit',
                        attrs: {
                            type: 'primary'
                        },
                        text: '提交',
                        callback(formData) {
                            console.log(formData)
                        }
                    },
                    {
                        label: '留言',
                        type: 'textarea',
                        style: {
                            resize: 'none',
                        },
                        key: 'msg',
                        attrs: {
                            maxLength: 150,
                            placeholder: '请输入...'
                        }
                    },
                    {
                        type: 'radio',
                        key: 'fruit',
                        value: '香蕉',
                        children: [
                            {
                                text: '苹果',
                                disabled: true
                            },
                            {
                                text: '香蕉',
                            },
                            {
                                text: '梨',
                            }
                        ]
                    },
                    {
                        label: 'Radio',
                        type: 'radio',
                        key: 'animal',
                        value: false
                    },
                    {
                        label: '复选框',
                        type: 'checkbox',
                        key: 'single',
                        value: false
                    },
                    {
                        type: 'checkbox',
                        key: 'fruits',
                        value: ['梨', '香蕉'],
                        children: [
                            {
                                text: '苹果',
                                disabled: true
                            },
                            {
                                text: '香蕉',
                            },
                            {
                                text: '梨',
                            }
                        ]
                    },
                    {
                        type: 'switch',
                        key: 'sw',
                        value: false,
                        children: [
                            {
                                slot: 'open',
                                text: '开启'
                            },
                            {
                                slot: 'close',
                                text: '关闭'
                            }
                        ],
                        size: 'large',
                        callback(vm, value) {
                            // console.log(vm, value)
                        }
                    },
                    {
                        type: 'table',
                        attrs: {
                            stripe: true,
                            border: true,
                        },
                        columns: [
                            {
                                title: 'Name',
                                key: 'name'
                            },
                            {
                                title: 'Age',
                                key: 'age'
                            },
                            {
                                title: 'Address',
                                key: 'address'
                            }
                        ],
                        data: [
                            {
                                name: 'John Brown',
                                age: 18,
                                address: 'New York No. 1 Lake Park',
                                date: '2016-10-03'
                            },
                            {
                                name: 'Jim Green',
                                age: 24,
                                address: 'London No. 1 Lake Park',
                                date: '2016-10-01'
                            },
                            {
                                name: 'Joe Black',
                                age: 30,
                                address: 'Sydney No. 1 Lake Park',
                                date: '2016-10-02'
                            },
                            {
                                name: 'Jon Snow',
                                age: 26,
                                address: 'Ottawa No. 2 Lake Park',
                                date: '2016-10-04'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        value: 'New York',
                        key: 'se',
                        options: [
                            {
                                value: 'New York',
                                label: 'New York'
                            },
                            {
                                value: 'London',
                                label: 'London'
                            },
                            {
                                value: 'Sydney',
                                label: 'Sydney'
                            },
                            {
                                value: 'Ottawa',
                                label: 'Ottawa'
                            },
                            {
                                value: 'Paris',
                                label: 'Paris'
                            },
                            {
                                value: 'Canberra',
                                label: 'Canberra'
                            }
                        ]
                    },
                    {
                        type: 'slider',
                        attrs: {
                            range: true,
                        },
                        value: [20, 50],
                        key: 'sli'
                    },
                    {
                        type: 'date',
                        key: 'da',
                        value: ['2018/12/20', '2018/12/30'],
                        attrs: {
                            type: 'daterange',
                            placeholder: 'Select date',
                            confirm: true
                        },
                        style: {
                            width: '200px'
                        }
                    },
                    {
                        type: 'time',
                        attrs: {
                            type: 'time',
                            placeholder: '选择时间'
                        },
                        style: {
                            width: '168px'
                        }
                    },
                    {
                        type: 'cascader',
                        style: {
                            width: '200px'
                        },
                        attrs: {
                            clearable: true,
                            'render-format': function(e) {
                                console.log(e)
                            }
                        },
                        'on-change': function(e) {
                            console.log(e)
                        },
                        value: [],
                        data: [{
                            value: 'beijing',
                            label: '北京',
                            children: [
                                {
                                    value: 'gugong',
                                    label: '故宫'
                                },
                                {
                                    value: 'tiantan',
                                    label: '天坛'
                                },
                                {
                                    value: 'wangfujing',
                                    label: '王府井'
                                }
                            ]
                        }, {
                            value: 'jiangsu',
                            label: '江苏',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: '南京',
                                    children: [
                                        {
                                            value: 'fuzimiao',
                                            label: '夫子庙',
                                        }
                                    ]
                                },
                                {
                                    value: 'suzhou',
                                    label: '苏州',
                                    style: {
                                        width: '200px'
                                    },
                                    children: [
                                        {
                                            value: 'zhuozhengyuan',
                                            label: '拙政园',
                                        },
                                        {
                                            value: 'shizilin',
                                            label: '狮子林',
                                        }
                                    ]
                                }
                            ],
                        }]
                    },
                    {
                        type: 'inputNumber',
                        value: 2,
                        max: 10,
                        min: 1,
                        callback(val) {
                            console.log(val)
                        }
                    },
                    {
                        type: 'rate',
                        value: 2,
                        callback(val) {
                            console.log(val)
                        }
                    },
                    {
                        type: 'upload',
                        text: 'Upload files',
                        action: '//jsonplaceholder.typicode.com/posts/',
                        callback(e) {
                            console.log(123)
                        }
                    }, 
                    {
                        type: 'colorPicker',
                        value: '#ddd',
                        callback(val) {
                            console.log(val)
                        }
                    }
                ]
            },
        }
    },
    components: {
        VueForm
    }
}
</script>

<style>

</style>
