import iView from 'iview'

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
            let component
            
            if (Array.isArray(item)) {

            } else {
                switch (item.type) {
                    case 'input':
                        component = generateInputComponent(h, formData, item)
                        break
                    case 'button':
                        component = generateButtonComponent(h, formData, item)
                        break
                    case 'submit':
                        component = generateSubmitComponent(this, options, h, formData, item)
                        break
                    case 'row':
                        component = generateRowComponent(this, options, h, formData, item)
                        break
                    case 'radio':
                        component = generateRadioComponent(h, formData, item)
                        break
                    case 'checkbox':
                        component = generateCheckboxComponent(h, formData, item)
                        break
                    case 'switch':
                        component = generateSwitchComponent(this, h, formData, item)
                        break
                    case 'table':
                        component = generateTableComponent(h, formData, item)
                        break
                    case 'select':
                        component = generateSelectComponent(h, formData, item)
                        break
                    case 'slider':
                        component = generateSliderComponent(h, formData, item)
                        break
                    case 'date':
                        component = generateDateComponent(h, formData, item)
                        break
                    case 'time':
                        component = generateTimeComponent(h, formData, item)
                        break
                    case 'cascader':
                        component = generateCascaderComponent(h, formData, item)
                        break
                    case 'inputNumber':
                        component = generateInputNumberComponent(h, formData, item)
                        break
                    case 'rate':
                        component = generateRateComponent(h, formData, item)
                        break
                    case 'upload':
                        component = generateUploadComponent(h, formData, item)
                        break
                    case 'colorPicker':
                        component = generateColorPickerComponent(h, formData, item)
                        break
                }
                

                return h(iView.FormItem, {
                    props: item.itemProps
                }, [component])
            }
        })
        
        return h(iView.Form, {
            ref: options.formData,
            props: {
                model: options.formData,
                rules: options.rules,
                ...options.formProps
            },
        }, components)
    }
}

function generateInputComponent(h, formData, obj) {
    const key = obj.itemProps.prop
    formData[key] = obj.props.value
    let children = []

    if (obj.children) {
        children = obj.children.map(item => {
            let component
            if (item.type == 'icon') {
                component = h(iView.Icon, {
                    slot: item.slot,
                    props: item.props,
                })
            } else if (item.type == 'span') {
                component = h(item.type, {
                    slot: item.slot
                }, [item.text])
            }
            return component
        })
    }

    return h(iView.Input, {
        props: obj.props,
        on: {
            input(val) {
                formData[key] = val
            },
            ...obj.events
        },
        slot: obj.slot
    }, children)
}

function generateSubmitComponent(vm, options, h, formData, item) {
    return h(iView.Button, {
        props: item.props,
        domProps: {
            innerHTML: item.text
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

function generateRowComponent(vm, options, h, formData, item) {
    const components = item.data.map(obj => {
        let component
        console.log(obj)
        switch (obj.type) {
            case 'input':
                component = generateInputComponent(h, formData, obj)
                break
            case 'button':
                component = generateButtonComponent(h, formData, obj)
                break
            case 'submit':
                component = generateSubmitComponent(vm, options, h, formData, obj)
                break
            case 'row':
                component = generateRowComponent(vm, options, h, formData, item)
                break
            case 'radio':
                component = generateRadioComponent(h, formData, obj)
                break
            case 'checkbox':
                component = generateCheckboxComponent(h, formData, obj)
                break
            case 'switch':
                component = generateSwitchComponent(vm, h, formData, obj)
                break
            case 'table':
                component = generateTableComponent(h, formData, obj)
                break
            case 'select':
                component = generateSelectComponent(h, formData, obj)
                break
            case 'slider':
                component = generateSliderComponent(h, formData, obj)
                break
            case 'date':
                component = generateDateComponent(h, formData, obj)
                break
            case 'time':
                component = generateTimeComponent(h, formData, obj)
                break
            case 'cascader':
                component = generateCascaderComponent(h, formData, obj)
                break
            case 'inputNumber':
                component = generateInputNumberComponent(h, formData, obj)
                break
            case 'rate':
                component = generateRateComponent(h, formData, obj)
                break
            case 'upload':
                component = generateUploadComponent(h, formData,obj)
                break
            case 'colorPicker':
                component = generateColorPickerComponent(h, formData, obj)
                break
        }
        
        return h(iView.Col, {
            props: obj.props
        }, [component])
    })

    return h(iView.Row, {
        props: item.props
    }, components)
}

function generateRadioComponent(h, formData, obj) {
    let component
    formData[obj.key] = obj.value
    if (obj.children) {
        const components = obj.children.map(item => {
            return h(iView.Radio, {
                attrs: {
                    label: item.text,
                    disabled: item.disabled
                },
                style: obj.style,
            })
        })

        component = h(iView.RadioGroup, {
            attrs: {
                value: obj.value
            },
            on: {
                input(val) {
                    formData[obj.key] = val
                }
            }
        }, components)
    } else {
        component = h(iView.Radio, {
                attrs: {
                    label: obj.label,
                    value: obj.value,
                },
                style: obj.style,
                on: {
                    input(val) {
                        formData[obj.key] = val
                    }
                }
            })
    }

    return component
}

function generateCheckboxComponent(h, formData, obj) {
    let component
    formData[obj.key] = obj.value
    
    if (obj.children) {
        const components = obj.children.map(item => {
            return h(iView.Checkbox, {
                attrs: {
                    label: item.text,
                    disabled: item.disabled
                },
                style: obj.style,
            })
        })

        component = h(iView.CheckboxGroup, {
            attrs: {
                value: obj.value
            },
            on: {
                input(val) {
                    obj.value = val
                    formData[obj.key] = obj.value
                }   
            }
        }, components)
    } else {
        component = h(iView.Checkbox, {
                attrs: {
                    value: obj.value,
                },
                style: obj.style,
                on: {
                    input(val) {
                        obj.value = val
                        formData[obj.key] = obj.value
                    }
                }
            }, [
                h('span', [obj.label])
            ])
    }

    return component
}

function generateSwitchComponent(vm, h, formData, obj) {
    let component
    formData[obj.key] = obj.value
    
    if (obj.children) {
        const components = obj.children.map(item => {
            return h('span', {
                domProps: {
                    innerHTML: item.text
                },
                slot: item.slot,
                style: obj.style,
            })
        })

        component = h(iView.Switch, {
            attrs: {
                size: obj.size,
                value: obj.value
            },
            on: {
                input(val) {
                    formData[obj.key] = val
                    obj.callback.call(vm, vm, val)
                }
            }
        }, components)
    } else {
        component = h(iView.Switch, {
                attrs: {
                    size: obj.size,
                    value: obj.value
                },
                style: obj.style,
                on: {
                    input(val) {
                        formData[obj.key] = val
                        obj.callback.call(vm, vm, val)
                    }
                }
            })
    }

    return component
}

function generateTableComponent(h, formData, obj) {
    return h('Table', {
        props: {
            columns: obj.columns,
            data: obj.data
        },
        attrs: obj.attrs,
        style: obj.style,
    })
}

function generateSelectComponent(h, formData, obj) {
    formData[obj.key] = obj.value
    const components = obj.options.map(item => {
        return h('Option', {
            props: {
                value: item.value,
                label: item.label
            }
        })
    })
    
    return h(iView.Select, {
        attrs: obj.attrs,
        props: {
            value: obj.value
        },
        on: {
            input(val) {
                formData[obj.key] = val
            }
        }
    }, components)
}

function generateSliderComponent(h, formData, obj) {
    formData[obj.key] = obj.value
    return h(iView.Slider, {
        attrs: obj.attrs,
        props: {
            value: obj.value
        },
        on: {
            input(val) {
                console.log(val)
                formData[obj.key] = val
            }
        }
    })
}


function generateDateComponent(h, formData, obj) {
    formData[obj.key] = obj.value? obj.value : ''
    return h(iView.DatePicker, {
        attrs: {
            type: 'daterange',
            placeholder: 'Select date',
            confirm: true
        },
        style: obj.style,
        props: {
            value: obj.value
        },
        on: {
            input(date) {
                if (Array.isArray(date)) {
                    formData[obj.key] = date.map(item => item? item.toLocaleDateString() : '')
                } else {
                    formData[obj.key] = date.toLocaleDateString()
                }
            }
        }
    })
}

function generateTimeComponent(h, formData, obj) {
    return h(iView.TimePicker, {
        attrs: obj.attrs,
        style: obj.style,
    })
}

function generateCascaderComponent(h, formData, obj) {
    return h(iView.Cascader, {
        style: obj.style,
        attrs: obj.attrs,
        domProps: {
            value: obj.value
        },
        props: {
            data: obj.data,
        },
        on: {
            'on-change': obj['on-change']? obj['on-change'] : function(){},
            'on-visible-change': obj['on-visible-change']? obj['on-visible-change'] : function(){}
        }
    })
}

function generateInputNumberComponent(h, formData, obj) {
    return h(iView.InputNumber, {
        style: obj.style,
        attrs: {
            value: obj.value
        },
        props: {
            max: obj.max,
            min: obj.min,
        },
        on: {
            input: obj.callback
        }
    })
}

function generateRateComponent(h, formData, obj) {
    return h(iView.Rate, {
        style: obj.style,
        attrs: {
            value: obj.value
        },
        on: {
            input: obj.callback
        }
    })
}

function generateUploadComponent(h, formData, obj) {
    return h(iView.Upload, {
        style: obj.style,
        props: {
            action: obj.action,
            onSuccess: obj.callback
        }
    }, [
        h(iView.Button, {
            domProps: {
                innerHTML: obj.text
            }
        })
    ])
}

function generateColorPickerComponent(h, formData, obj) {
    return h(iView.ColorPicker, {
        style: obj.style,
        props: {
            value: obj.value
        },
        on: {
            input: obj.callback
        }
    })
}