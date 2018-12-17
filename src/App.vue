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
                    'label-position': 'right'
                },
                // 表单数据
                formData: {
                    user: '',
                    password: ''
                },
                // 验证规则
                rules: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                // 表单项
                formItem: [
                    {
                        // FormItem props属性
                        itemProps: {
                            prop: 'user',
                            label: '用户名',
                            'label-width': 80,
                        },
                        type: 'input',
                        // 组件props 指type为input的这个组件
                        props: {
                            type: 'text',
                            placeholder: 'username',
                            value: 'abc',
                            autofocus: true,
                            suffix: 'ios-contact'
                        },
                        events: {
                            'on-enter': function(e) {
                                console.log(e.target.value)
                            }
                        },
                        children: [
                            {
                                type: 'span',
                                text: 'http://',
                                slot: 'prepend'
                            }
                        ],
                    },
                    {
                        type: 'input',
                        itemProps: {
                            prop: 'password',
                            label: '密码',                           
                            'label-width': 80,
                        },
                        props: {
                            type: 'password',
                            placeholder: 'password',
                            value: '123',
                        },
                    },
                    {
                        type: 'row',
                        data: [
                            {
                                props: {
                                    span: 18
                                },
                                children: [
                                    {
                                        type: 'input',
                                    }
                                ]
                            },
                            {
                                props: {
                                    span: 4,
                                    offset: 1,
                                },
                                children: [
                                    {
                                        type: 'button',
                                        text: 'Delete'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'submit',
                        attrs: {
                            type: 'primary'
                        },
                        text: '登陆'
                    }
                ],
                // 验证成功回调
                success(formData) {
                    console.log(formData)
                },
                // 验证失败回调
                fail(formData) {
                    console.log('验证失败')
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
