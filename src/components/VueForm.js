import Schema from 'async-validator'
import iView from 'iview'

export default {
    name: 'VueForm',
    data () {
        return {
            formData: {}
        }
    },
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    render(h) {
        const options = this.options

        const components = options.data.map(item => {
            let component
            
            switch (item.type) {
                case 'input':
                    component = generateInputComponent(h, this.formData, item)
                    break
                case 'submit':
                    component = generateSubmitComponent(this, h, this.formData, item)
                    break
                case 'textarea':
                    component = generateTextareaComponent(h, this.formData, item)
                    break
                case 'radio':
                    component = generateRadioComponent(h, this.formData, item)
                    break
                case 'checkbox':
                    component = generateCheckboxComponent(h, this.formData, item)
                    break
                case 'switch':
                    component = generateSwitchComponent(this, h, this.formData, item)
                    break
                case 'table':
                    component = generateTableComponent(h, this.formData, item)
                    break
                case 'select':
                    component = generateSelectComponent(h, this.formData, item)
                    break
                case 'slider':
                    component = generateSliderComponent(h, this.formData, item)
                    break
                case 'date':
                    component = generateDateComponent(h, this.formData, item)
                    break
                case 'time':
                    component = generateTimeComponent(h, this.formData, item)
                    break
                case 'cascader':
                    component = generateCascaderComponent(h, this.formData, item)
                    break
                case 'inputNumber':
                    component = generateInputNumberComponent(h, this.formData, item)
                    break
                case 'rate':
                    component = generateRateComponent(h, this.formData, item)
                    break
                case 'upload':
                    component = generateUploadComponent(h, this.formData, item)
                    break
                case 'colorPicker':
                    component = generateColorPickerComponent(h, this.formData, item)
                    break
            }

            return component
        })

        return h('form', {
            attrs: {
                class: 'vue-generate-form'
            }
        }, components)
    }
}

function generateInputComponent(h, formData, obj) {
    const key = obj.key
    const value = obj.rules
    const descriptor = {}
    descriptor[key] = value
    const validator = new Schema(descriptor)

    formData[key] = obj.value

    return h('div', [
        obj.label,
        h('div', {
            style: {
                display: 'inline-block',
                verticalAlign: 'top'
            }
        }, [
            h('input', {
                domProps: {
                    value: obj.value
                },
                attrs: obj.attrs,
                style: obj.style,
                on: {
                    input(e) {
                        formData[key] = e.target.value
                    },
                    blur(e) {
                        const target = e.target
                        const temp = {}
                        temp[key] = target.value
                        validator.validate(temp, (errors, fields) => {
                            if (errors) {
                                target.nextElementSibling.innerHTML = errors[0].message.replace(key, obj.label)
                            } else {
                                target.nextElementSibling.innerHTML = ''
                            }
                        })
                    }
                }
            }),
            h('p', {
                style: {
                    color: 'red'
                }
            })
        ])
    ])
}

function generateSubmitComponent(vm, h, formData, obj) {
    return h(iView.Button, {
        domProps: {
            innerHTML: '提交'
        },
        attrs: obj.attrs,
        style: obj.style,
        on: {
            click(e) {
                obj.callback.call(vm, formData)
            }
        }
    })
}


function generateTextareaComponent(h, formData, obj) {
    formData[obj.key] = obj.value? obj.value : ''
    return h('div', [
        obj.label,
        h('div',  {
            style: {
                display: 'inline-block',
                verticalAlign: 'top'
            }
        }, [
            h('textarea', {
                domProps: {
                    value: obj.value
                },
                attrs: obj.attrs,
                style: obj.style,
                on: {
                    input(e) {
                        formData[obj.key] = e.target.value
                    },
                    blur(e) {
                        const target = e.target
                        if (target.value === '') {
                            target.nextElementSibling.innerHTML = '请输入留言'
                        } else {
                            target.nextElementSibling.innerHTML = ''
                        }
                    }
                }
            }),
            h('p', {
                style: {
                    color: 'red'
                }
            })
        ])
    ])
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

    return h('div', [component])
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

    return h('div', [component])
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

    return h('div', [component])
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
    return h('div', [
        h(iView.TimePicker, {
            attrs: obj.attrs,
            style: obj.style,
        })
    ])
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
    return h('div', [
        h(iView.InputNumber, {
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
    ])
    
}

function generateRateComponent(h, formData, obj) {
    return h('div', [
        h(iView.Rate, {
            style: obj.style,
            attrs: {
                value: obj.value
            },
            on: {
                input: obj.callback
            }
        })
    ])
}

function generateUploadComponent(h, formData, obj) {
    return h('div', [
        h(iView.Upload, {
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
    ])
}

function generateColorPickerComponent(h, formData, obj) {
    return h('div', [
        h(iView.ColorPicker, {
            style: obj.style,
            props: {
                value: obj.value
            },
            on: {
                input: obj.callback
            }
        })
    ])
}