<template>
    <div id="app">
        <h3>{{name}}</h3>
        <input type="text" v-model="newItem" @keyup.enter="onEnter">
        <ul>
            <li v-for="item in items" @click="toggleFinished(item)" v-bind:class="{finished: item.finished}">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>

<script>
    import Hello from './components/Hello'
    import Store from './store'

    export default {
        data: function () {
            return {
                name: 'To Do List',
                items: Store.fetch(),
                newItem: ''
            }
        },
        watch: {
            items: {
                handler: function (items) {
                    Store.save(items)
                },
                deep: true
            }
        },
        methods: {
            toggleFinished: function (item) {
                console.log(item)
                item.finished = !item.finished
            },
            onEnter: function () {
                this.items.push({
                    label: this.newItem,
                    finished: false
                })

                this.newItem = ''
            }
        },
        components: {
            Hello
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .finished {
        color: green;
        text-decoration: underline
    }
</style>
