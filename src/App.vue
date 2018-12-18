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
                    date: '2018/12/12',
                    time: '',
                    desc: ''
                },
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
                // 表单项
                formItem: [
                    {
                        // FormItem props属性
                        itemProps: {
                            prop: 'name',
                            label: 'name',
                        },
                        key: 'name',
                        type: 'input',
                        // 组件props 指type为input的这个组件
                        props: {
                            placeholder: 'Enter your name',
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
                        type: 'row',
                        itemProps: {
                            label: 'Date'
                        },
                        children: [
                            {
                                props: {
                                    span: 11
                                },
                                children: [
                                    {
                                        type: 'formItem',
                                        children: [
                                            {
                                                type: 'date',
                                                props: {
                                                    type: 'date',
                                                    placeholder: 'Select date'
                                                },
                                                key: 'date',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                props: {
                                    span: 2,
                                    style: 'text-align: center',
                                },
                                text: '-'
                            },
                            {
                                props: {
                                    span: 11
                                },
                                children: [
                                    {
                                        type: 'formItem',
                                        props: {
                                            prop: 'time'
                                        },
                                        children: [
                                            {
                                                type: 'time',
                                                props: {
                                                    type: 'time',
                                                    placeholder: 'Select time'
                                                },
                                                key: 'time',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                            prop: 'interest'
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
                        type: 'submit',
                        props: {
                            type: 'primary',
                        },
                        text: 'Submit'
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
    },
    components: {
        VueForm
    }
}
</script>

<style>

</style>
