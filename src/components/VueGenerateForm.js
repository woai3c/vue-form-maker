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

function generateInputComponent(h, formData, obj, vm, options) {
    const key = obj.key? obj.key : ''
    let children = []
    
    if (obj.children) {
        children = obj.children.map(item => {
            let component
            if (item.type == 'span') {
                component = h('span', {
                    slot: item.slot
                }, [item.text])
            } else {
                let func = componentObj[item.type]
                component = func? func.call(vm, h, formData, item, vm, options) : null
            }
            return component
        })
    }

    return h('Input', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        },
        slot: obj.slot
    }, children)
}

function generateButtonComponent(h, formData, obj) {
    return h('Button', {
        props: obj.props,
        slot: obj.slot,
        style: obj.style,
        on: obj.events
    }, [obj.text])
}

function generateButtonGroupComponent(h, formData, obj) {
    const components = obj.children.map(item => {
        return generateButtonComponent(h, formData, item)
    })

    return h('ButtonGroup', {
        props: obj.props,
        style: obj,style,
    }, [components])
}

function generateSubmitComponent(h, formData, obj, vm, options) {
    const components = []
    const submit = h('Button', {
        props: obj.props,
        style: obj.style,
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
    }, [obj.text])

    components.push(submit)

    if (obj.reset) {
        const reset = h('Button', {
            props: obj.reset.props,
            style: {
                marginLeft: '10px',
                ...obj.style,
            },
            on: {
                click() {
                    vm.$refs[formData].resetFields()
                }
            }
        }, [obj.reset.text])

        components.push(reset)
    }

    return h('div', components)
}

function generateResetComponent(h, formData, obj, vm) {
    return h('Button', {
        props: obj.props,
        style: obj.style,
        on: {
            click() {
                vm.$refs[formData].resetFields()
            }
        }
    }, [obj.text])
}

function generateIconComponent(h, formData, obj) {
    return h('Icon', {
        props: obj.props,
        style: obj.style,
        slot: obj.slot,
    })
}

function generateRadioComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Radio', {
        props: {
            value: key? formData[key] : false,
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
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
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    }, [components])
}


function generateCheckboxComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Checkbox', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
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
            value: key? formData[key] : [],
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
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
                    slot: item.slot,
                }, [item.text])
            }

            return temp
        })
    } 

    return h('i-switch', {
        props: {
            value: key? formData[key] : false,
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        },
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
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        },
        slot: obj.slot
    }, components)
}

function generateSliderComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Slider', {
        props: {
            value: formData[key],
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    })
}


function generateDateComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('DatePicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            input(date) {
                if (key) {
                    if (Array.isArray(date)) {
                        formData[key] = date? date.map(item => item? item.toLocaleDateString() : '') : ''
                    } else {
                        formData[key] = date? date.toLocaleDateString() : ''
                    }
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
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    })
}

function generateCascaderComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''
    
    return h('Cascader', {
        props: {
            value: key? formData[key] : [],
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    })
}

function generateInputNumberComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('InputNumber', {
        props: {
            value: key? formData[key] : null,
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    })
}

function generateRateComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('Rate', {
        props: {
            value: key? formData[key] : 0,
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
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
        style: obj.style,
        slot: obj.slot,
    }, components)
}

function generateColorPickerComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h('ColorPicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        on: {
            input(val) {
                if (key) {
                    formData[key] = val
                }
            },
            ...obj.events
        }
    })
}