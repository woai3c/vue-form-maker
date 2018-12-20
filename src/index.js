import VueGenerateForm from './components/VueGenerateForm'

const install = function(Vue, opts = {}) {
    if (install.installed) return
    Vue.component('VueGenerateForm', VueGenerateForm)
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    install,
    VueGenerateForm,
    version: '1.0.0',
}

export default API