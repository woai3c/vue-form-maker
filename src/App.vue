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
            options: [
                {
                    type: 'input',
                    attrs: {
                        type: 'text',
                        placeholder: 'Enter name...',
                    },
                    value: 'test',
                    rules: {
                        
                    }
                }
            ]
        }
    },
    components: {
        VueForm
    }
}
</script>

<style>

</style>
