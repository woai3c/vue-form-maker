const componentObj = {
    input: generateInputComponent,
    button: generateButtonComponent,
    buttonGroup: generateButtonGroupComponent,
    reset: generateResetComponent,
    submit: generateSubmitComponent,
    icon: generateIconComponent,
    radio: generateRadioComponent,
    radioGroup: generateRadioGroupComponent,
    checkbox: generateCheckboxComponent,
    checkboxGroup: generateCheckboxGroupComponent,
    switch: generateSwitchComponent,
    select: generateSelectComponent,
    slider: generateSliderComponent,
    date: generateDateComponent,
    time: generateTimeComponent,
    cascader: generateCascaderComponent,
    inputNumber: generateInputNumberComponent,
    rate: generateRateComponent,
    upload: generateUploadComponent,
    colorPicker: generateColorPickerComponent,
}

export default {
    name: 'VueGenerateForm',
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    render(h) {
        const options = this.options
        const formData = options.formData
        const components = options.formItem.map(item => {
            let func = componentObj[item.type]
            let component = func? func.call(this, h, formData, item, this, options) : null

            if (item.type == 'submit' && !item.itemProps) {
                item.itemProps = {}
            }

            if (item.itemProps || item.label) {
                component = h('FormItem', {
                    props: {
                        label: item.label,
                        ...item.itemProps
                    }
                }, [component])
            }

            return h('Col', {
                props: item.colProps,
            }, [component])
        })
        
        return h('Form', {
            ref: formData,
            props: {
                model: formData,
                ...options.formProps
            },
            class: 'vue-generate-form'
        }, [
            h('Row', {
                props: options.layoutProps
            }, components)
        ])
    }
}

function generateInputComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''
    let children = []

    if (obj.children) {
        children = obj.children.map(item => {
            let component
            if (item.type == 'icon') {
                component = generateIconComponent(h, formData, item)
            } else if (item.type == 'span') {
                component = h('span', {
                    slot: item.slot
                }, [item.text])
            }
            return component
        })
    }

    return h('Input', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        },
        slot: obj.slot
    }, children)
}

function generateButtonComponent(h, formData, obj) {
    return h('Button', {
        props: obj.props,
        domProps: {
            innerHTML: obj.text
        }
    })
}

function generateButtonGroupComponent(h, formData, obj) {
    const components = obj.children.map(item => {
        return generateButtonComponent(h, formData, item)
    })

    return h('ButtonGroup', {
        props: obj.props
    }, [components])
}

function generateSubmitComponent(h, formData, obj, vm, options) {
    const components = []
    const submit = h('Button', {
        props: obj.props,
        domProps: {
            innerHTML: obj.text
        },
        on: {
            click() {
                vm.$refs[formData].validate((valid) => {
                    if (valid) {
                        options.success.call(vm, formData)
                    } else {
                        options.fail.call(vm, formData)
                    }
                })
            }
        }
    })

    components.push(submit)

    if (obj.reset) {
        const reset = h('Button', {
            props: obj.reset.props,
            style: {
                marginLeft: '10px'
            },
            domProps: {
                innerHTML: obj.reset.text
            },
            on: {
                click() {
                    vm.$refs[formData].resetFields()
                }
            }
        })

        components.push(reset)
    }

    return h('div', components)
}

function generateResetComponent(h, formData, obj, vm) {
    return h('Button', {
        props: obj.props,
        domProps: {
            innerHTML: obj.text
        },
        on: {
            click() {
                vm.$refs[formData].resetFields()
            }
        }
    })
}

function generateIconComponent(h, formData, obj) {
    return h('Icon', {
        props: obj.props,
        slot: obj.slot,
    })
}

function generateRadioComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Radio', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}


function generateRadioGroupComponent(h, formData, obj) {
    let components = []
    const key = obj.key? obj.key : ''
    if (obj.children) {
        components = obj.children.map(child => {
            return h('Radio', {
                props: child.props,
            })
        })
    }

    return h('RadioGroup', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    }, [components])
}


function generateCheckboxComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Checkbox', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })

}

function generateCheckboxGroupComponent(h, formData, obj, vm) {
    let components = []
    const key = obj.key? obj.key : ''

    if (obj.children) {
        components = obj.children.map(child => {
            return h('Checkbox', {
                props: child.props,
            })
        })
    }

    return h('CheckboxGroup', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    }, [components])
}

function generateSwitchComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    let components = []
    if (obj.children) {
        components = obj.children.map(item => {
            let temp
            if (item.type == 'icon') {
                temp = generateIconComponent(h, formData, item)
            } else if (item.type == 'span') {
                temp = h('span', {
                    domProps: {
                        innerHTML: item.text
                    },
                    slot: item.slot,
                })
            }

            return temp
        })
    } 

    return h('Switch', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    }, components)
}

function generateSelectComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    let components = []

    if (obj.options) {
        components = obj.options.map(item => {
            if (item.type == 'optionGroup') {
                return h('OptionGroup', {
                    props: item.props
                }, item.children.map(child => {
                    return h('Option', {
                        props: child.props
                    })
                }))
            } else {
                return h('Option', {
                    props: item.props
                })
            }
        })
    }
    
    return h('Select', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    }, components)
}

function generateSliderComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Slider', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}


function generateDateComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('DatePicker', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(date) {
                if (Array.isArray(date)) {
                    formData[key] = date? date.map(item => item? item.toLocaleDateString() : '') : ''
                } else {
                    formData[key] = date? date.toLocaleDateString() : ''
                }
            },
            ...obj.events
        }
    })
}

function generateTimeComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('TimePicker', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}

function generateCascaderComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''
    
    return h('Cascader', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}

function generateInputNumberComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('InputNumber', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}

function generateRateComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Rate', {
        props: {
            value: formData[key],
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}

function generateUploadComponent(h, formData, obj, vm, options) {
    let components = []

    if (obj.children) {
        components = obj.children.map(item => {
            let func = componentObj[item.type]
            return func? func.call(vm, h, formData, item, vm, options) : null
        })
    }
    return h('Upload', {
        props: obj.props,
    }, components)
}

function generateColorPickerComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('ColorPicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        }
    })
}