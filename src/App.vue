<template>
    <div id="app">
        <VueGenerateForm :options="options"/>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            options: {
                // Form props属性
                formProps: {
                    'label-width': 80
                },
                // 表单数据
                formData: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    radio: false,
                    cascader: [],
                    color: 'red',
                    upload: ''
                },
                // 表单项
                formItem: [
                    {
                        // FormItem props属性
                        itemProps: {
                            prop: 'name',
                            label: 'name',
                            rules: { 
                                required: true,  
                                trigger: 'blur',
                                validator(rule, value, callback) {
                                    if (value === '') {
                                        callback(new Error('Please enter your password'))
                                    } else if (!/[a-z0-9]/.test(value)) {
                                        callback(new Error('只能输入字母数字'))
                                    } else {
                                        callback()
                                    }
                                },
                            }
                        },
                        key: 'name',
                        type: 'input',
                        props: {
                            placeholder: 'Enter your name',
                        },
                    },
                    {
                        itemProps: {
                            prop: 'radio',
                            label: 'Radio',
                        },
                        type: 'radio',
                        key: 'radio'
                    },
                    {
                        label: 'buttonGroup',
                        type: 'buttonGroup',
                        children: [
                            {
                                text: 'test1'
                            },
                            {
                                text: 'test2'
                            }
                        ]
                    },
                    {
                        label: '图标',
                        type: 'icon',
                        props: {
                            type: 'ios-checkmark',
                            size: '24'
                        }
                    },
                    {
                        type: 'switch',
                        itemProps: {
                            label: 'switch'
                        },
                    },
                    {
                        itemProps: {
                            prop: 'mail',
                            label: 'E-mail',
                        },
                        key: 'mail',
                        type: 'input',
                        props: {
                            placeholder: 'Enter your e-mail',
                        },
                    },
                    {
                        itemProps: {
                            prop: 'city',
                            label: 'City',
                        },
                        key: 'city',
                        type: 'select',
                        props: {
                            placeholder: 'Select your city',
                        },
                        options: [
                            {
                                props: {
                                    value: 'bejjing',
                                    text: 'New York'
                                }
                            },
                            {
                                props: {
                                    value: 'shanghai',
                                    text: 'London'
                                }
                            },
                            {
                                props: {
                                    value: 'shenzhen',
                                    text: 'Sydney'
                                }
                            }
                        ]
                    },
                    {
                        itemProps: {
                            label: 'Date',
                            prop: 'date',
                            rules: [
                                { required: true, message: '请选择日期', trigger: 'change' }
                            ]
                        },
                        colProps: {
                            span: 12
                        },
                        type: 'date',
                        props: {
                            type: 'date',
                            placeholder: 'Select date'
                        },
                        key: 'date',
                    },
                    {
                        itemProps: {
                            prop: 'time',
                            rules: [
                                { required: true, message: '请选择时间', trigger: 'change' },
                            ]
                        },
                        colProps: {
                            span: 12
                        },
                        type: 'time',
                        props: {
                            type: 'time',
                            placeholder: 'Select time'
                        },
                        key: 'time',
                    },
                    {
                        itemProps: {
                            label: 'Gender',
                            prop: 'gender'
                        },
                        type: 'radioGroup',
                        key: 'gender',      
                        children: [
                            {
                                props: {
                                    label: '男性'
                                },
                            },
                            {
                                props: {
                                    label: '女性'
                                },
                            }
                        ]
                    },
                    {
                        itemProps: {
                            label: 'Hobby',
                            prop: 'interest',
                            rules: [
                                { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                                { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                            ]
                        },
                        type: 'checkboxGroup',
                        key: 'interest',
                        children: [
                            {
                                props: {
                                    label: 'Eat'
                                },
                            },
                            {
                                props: {
                                    label: 'Sleep'
                                },
                            },
                            {
                                props: {
                                    label: 'Run'
                                },
                            },
                            {
                                props: {
                                    label: 'Movie'
                                },
                            }
                        ]
                    },
                    {
                        itemProps: {
                            label: 'Desc',
                            prop: 'desc'
                        },
                        key: 'desc',
                        type: 'input',
                        props: {
                            type: 'textarea',
                            autosize: {minRows: 2,maxRows: 5},
                            placeholder: 'Enter something...'
                        },
                    },
                    {
                        label: '城市',
                        type: 'cascader',
                        key: 'cascader',
                        props: {
                            data: cityData
                        }
                    },
                    {
                        type: 'inputNumber',
                        label: '数字输入框'
                    },
                    {
                        type: 'rate',
                        label: '评分'
                    },
                    {
                        type: 'upload',
                        label: '上传',
                        props: {
                            action: "//jsonplaceholder.typicode.com/posts/"
                        },
                        key: 'upload',
                        itemProps: {
                            prop: 'upload',
                            rules: {required: true, trigger: 'change'}
                        },
                        children: [
                            {
                                type: 'button',
                                text: 'Upload files'
                            }
                        ]
                    },
                    {
                        type: 'colorPicker',
                        key: 'color',
                        label: '颜色'
                    },
                    {
                        type: 'submit',
                        props: {
                            type: 'primary',
                        },
                        text: 'Submit',
                        reset: {
                            text: 'Reset'
                        }
                    },
                ],
                // 验证成功回调
                success(formData) {
                    console.log(formData)
                },
                // 验证失败回调
                fail(formData) {
                    console.log(formData)
                }
            },
        }
    }
}
</script>

<style>

</style>
