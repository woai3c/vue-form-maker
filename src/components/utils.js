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
    col: generateColComponent,
    formItem: generateFormItemComponent,
}

function generateInputComponent(h, formData = {}, obj, vm) {
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
                component = func? func.call(vm, h, formData, item, vm) : null
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
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        },
        slot: obj.slot
    }, children)
}

function generateButtonComponent(h, formData = {}, obj, vm) {
    return h('Button', {
        props: obj.props,
        slot: obj.slot,
        style: obj.style,
        on: obj.events
    }, [obj.text])
}

function generateButtonGroupComponent(h, formData = {}, obj, vm) {
    const components = obj.children.map(item => {
        return h('Button', {
            props: item.props? item.props : item,
            slot: item.slot,
            style: item.style,
            on: item.events
        }, [item.text])
    })

    return h('ButtonGroup', {
        props: obj.props,
        style: obj.style,
        slot: obj.slot,
    }, [components])
}

function generateSubmitComponent(h, formData = {}, obj, vm) {
    const components = []
    const submit = h('Button', {
        props: obj.props,
        style: obj.style,
        on: {
            click() {
                vm.$refs['form'].validate((valid) => {
                    if (valid) {
                        obj.success.call(vm, formData)
                    } else {
                        obj.fail.call(vm, formData)
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
                    vm.$refs['form'].resetFields()
                }
            }
        }, [obj.reset.text])

        components.push(reset)
    }

    return h('div', components)
}

function generateResetComponent(h, formData = {}, obj, vm) {
    return h('Button', {
        props: obj.props,
        style: obj.style,
        slot: obj.slot,
        on: {
            click() {
                vm.$refs['form'].resetFields()
            }
        }
    }, [obj.text])
}

function generateIconComponent(h, formData = {}, obj, vm) {
    return h('Icon', {
        props: obj.props,
        style: obj.style,
        slot: obj.slot,
    })
}

function generateRadioComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('Radio', {
        props: {
            value: key? formData[key] : false,
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    }, [obj.text])
}


function generateRadioGroupComponent(h, formData = {}, obj, vm) {
    let components = []
    const key = obj.key? obj.key : ''
    if (obj.children) {
        components = obj.children.map(child => {
            return h('Radio', {
                props: child.props? child.props : child
            }, [child.text])
        })
    }

    return h('RadioGroup', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    }, [components])
}


function generateCheckboxComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('Checkbox', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    }, [obj.text])

}

function generateCheckboxGroupComponent(h, formData = {}, obj, vm) {
    let components = []
    const key = obj.key? obj.key : ''

    if (obj.children) {
        components = obj.children.map(child => {
            return h('Checkbox', {
                props: child.props? child.props : child
            }, [child.text])
        })
    }

    return h('CheckboxGroup', {
        props: {
            value: key? formData[key] : [],
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    }, [components])
}

function generateSwitchComponent(h, formData = {}, obj, vm) {
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
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        },
    }, components)
}

function generateSelectComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    let components = []

    if (obj.children) {
        components = obj.children.map(item => {
            if (item.type == 'optionGroup') {
                return h('OptionGroup', {
                    props: item.props? item.props : item
                }, item.children.map(child => {
                    return h('Option', {
                        props: child.props? child.props : child
                    })
                }))
            } else {
                return h('Option', {
                    props: item.props? item.props : item
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
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        },
        slot: obj.slot
    }, components)
}

function generateSliderComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('Slider', {
        props: {
            value: formData[key],
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}


function generateDateComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''
    const type = obj.props.type
    return h('DatePicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(date) {
                if (key) {
                    if (type.includes('datetime')) {
                        if (Array.isArray(date)) {
                            formData[key] = date? date.map(item => item? item.toLocaleDateString() 
                                                  + ' ' + item.toTimeString().split(' ')[0] : '') : []
                        } else {
                            formData[key] = date? date.toLocaleDateString() + ' ' + date.toTimeString().split(' ')[0] : ''
                        }
                    } else {
                        if (Array.isArray(date)) {
                            formData[key] = date? date.map(item => item? item.toLocaleDateString() : '') : []
                        } else {
                            formData[key] = date? date.toLocaleDateString() : ''
                        }
                    }
                }
            },
        }
    })
}

function generateTimeComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('TimePicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}

function generateCascaderComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''
    
    return h('Cascader', {
        props: {
            value: key? formData[key] : [],
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}

function generateInputNumberComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('InputNumber', {
        props: {
            value: key? formData[key] : null,
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}

function generateRateComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('Rate', {
        props: {
            value: key? formData[key] : 0,
            ...obj.props
        },
        slot: obj.slot,
        style: obj.style,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}

function generateUploadComponent(h, formData = {}, obj, vm) {
    let components = []

    if (obj.children) {
        components = obj.children.map(item => {
            let func = componentObj[item.type]
            return func? func.call(vm, h, formData, item, vm) : null
        })
    }
    return h('Upload', {
        props: obj.props,
        style: obj.style,
        slot: obj.slot,
    }, components)
}

function generateColorPickerComponent(h, formData = {}, obj, vm) {
    const key = obj.key? obj.key : ''

    return h('ColorPicker', {
        props: {
            value: key? formData[key] : '',
            ...obj.props
        },
        style: obj.style,
        slot: obj.slot,
        on: {
            ...translateEvents(obj.events, vm),
            input(val) {
                if (key) {
                    formData[key] = val
                }
            }
        }
    })
}

function generateColComponent(h, obj, component) {
    return h('Col', {
        props: {
            span: obj.span,
            push: obj.push,
            pull: obj.pull,
            offset: obj.offset,
            order: obj.order,
            'class-name': obj['class-name'] || obj['className'],
            xs: obj.xs,
            sm: obj.sm,
            md: obj.md,
            lg: obj.lg,
        },
    }, [component])
}

function generateFormItemComponent(h, obj, component) {
    return h('FormItem', {
        class: obj.className,
        props: {
            label: obj.label,
            rules: obj.rules,
            prop: obj.key? obj.key : '',
            'label-width':obj['label-width'] || obj['labelWidth'],
            'label-for': obj['label-for'] || obj['labelFor'],
            error: obj.error,
            'show-message': obj['show-message'] || obj['showMessage'],
        }
    }, [component])
}


function translateEvents(events = {}, vm) {
    const result = {}
    for (let event in events) {
        result[event] = events[event].bind(vm)
    }

    return result
}

export default componentObj