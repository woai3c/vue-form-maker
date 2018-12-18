import iView from 'iview'

const componentObj = {
    formItem: generateFormItemComponent,
    input: generateInputComponent,
    button: generateButtonComponent,
    buttonGroup: generateButtonGroupComponent,
    submit: generateSubmitComponent,
    row: generateRowComponent,
    icon: generateIconComponent,
    radio: generateRadioComponent,
    radioGroup: generateRadioGroupComponent,
    checkbox: generateCheckboxComponent,
    checkboxGroup: generateCheckboxGroupComponent,
    switch: generateSwitchComponent,
    table: generateTableComponent,
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
    name: 'VueForm',
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

            return h(iView.FormItem, {
                props: item.itemProps
            }, [component])
        })
        
        return h(iView.Form, {
            ref: formData,
            props: {
                model: formData,
                rules: options.rules,
                ...options.formProps
            },
        }, components)
    }
}

function generateFormItemComponent(h, formData, obj, vm, options) {
    let components = []

    if (obj.children) {
        components = obj.children.map(child => {
            let func = componentObj[child.type]
            return func? func.call(vm, h, formData, child, vm, options) : null
        })
    }

    return h(iView.FormItem, {
        props: obj.props
    }, components)
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

    return h(iView.Input, {
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
    return h(iView.Button, {
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

    return h(iView.ButtonGroup, {
        props: obj.props
    }, [components])
}

function generateSubmitComponent(h, formData, obj, vm, options) {
    return h(iView.Button, {
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
}

function generateRowComponent(h, formData, obj, vm, options) {
    const components = obj.children.map(col => {
        let subComponents = []

        if (col.children) {
            subComponents = col.children.map(child => {
                if (child.children) {
                    if (child.type == 'formItem') {
                        return generateFormItemComponent(h, formData, child, vm, options)
                    }
                } else {
                    let func = componentObj[child.type]
                    return func? func.call(vm, h, formData, child, vm, options) : null
                }
                
            })
        } 
        
        return h(iView.Col, {
            props: col.props,
            domProps: {
                innerHTML: col.text
            }
        }, subComponents)
    })

    return h(iView.Row, {
        props: obj.props
    }, components)
}

function generateIconComponent(h, formData, obj) {
    return h(iView.Icon, {
        props: obj.props,
        slot: obj.slot,
    })
}

function generateRadioComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h(iView.Radio, {
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
            return h(iView.Radio, {
                props: child.props,
            })
        })
    }

    return h(iView.RadioGroup, {
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

    return h(iView.Checkbox, {
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
            return h(iView.Checkbox, {
                props: child.props,
            })
        })
    }

    return h(iView.CheckboxGroup, {
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

    return h(iView.Switch, {
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

function generateTableComponent(h, formData, obj) {
    return h('Table', {
        props: obj.props,
        on: obj.events
    })
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
    
    return h(iView.Select, {
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

    return h(iView.Slider, {
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

    return h(iView.DatePicker, {
        props: obj.props,
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

    return h(iView.TimePicker, {
        props: obj.props,
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
    
    return h(iView.Cascader, {
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

    return h(iView.InputNumber, {
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

    return h(iView.Rate, {
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

function generateUploadComponent(h, formData, obj) {
    return h(iView.Upload, {
        props: obj.props,
    }, [
        h(iView.Button, {
            domProps: {
                innerHTML: obj.text
            }
        })
    ])
}

function generateColorPickerComponent(h, formData, obj) {
    const key = obj.key? obj.key : ''

    return h(iView.ColorPicker, {
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