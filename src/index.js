import VueFormMaker from './components/VueFormMaker'

const install = function(Vue, opts = {}) {
    Vue.component('VueFormMaker', VueFormMaker)
}

const API = {
    install,
    version: '1.0.2',
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default API
