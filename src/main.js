import Vue from 'vue'
import App from './App'
import iView from 'iview'
import VueGenerateForm from './vue-generate-form.js'
import 'iview/dist/styles/iview.css'
import './cityData/cityData2'
console.log(VueGenerateForm)
Vue.config.productionTip = false
Vue.use(iView)
// Vue.use(VueGenerateForm)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
