<template>
<div class="container">
  <h2>Todo List</h2>
  <v-form v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="TodoList"
      required
      v-on:keyup.enter="createTodo(name)"
    ></v-text-field>
  </v-form>
  <v-btn block color="secondary" @click="createTodo(name)">추가</v-btn>
  <v-list>
        <v-list-tile v-for="(item,index) in items" :key="item.title">
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-btn icon @click="deleteTodo(index)">
                <v-icon color="grey lighten-1">delete</v-icon>
            </v-btn>
        </v-list-tile>
    </v-list>
</div>
</template>

<script>
export default {
    data(){
        return {
           items: [
                { title: 'HTML'},
                { title: 'CSS'},
                { title: 'JAVASCRIPT'},
                { title: 'JQUERY'}
            ]
        };
    },
    methods:{
        deleteTodo(i){
            this.items.splice(i,1);
        },
        createTodo(name){
            if(name != null){
                this.items.push({title:name});
                this.title = null;
            }
        }
    },
    mounted() {
        //console.log('Component mounted.')
    }
}
</script>

