<template>
<div class="container">
  <h2>Todo List</h2>
  <v-form v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
      v-on:keyup.enter="createTodo(name)"
    ></v-text-field>
  </v-form>
  <v-btn block color="secondary" @click="createTodo(name)">추가</v-btn>
  <v-list two-line>
      <template v-for="(item,index) in items">
            <v-list-tile :key="item.title">
                <v-list-tile-content>
                    <v-list-tile-title v-if="item !== editingItem" v-text="item.title"></v-list-tile-title>
                    <v-text-field v-else v-model="itemText" required></v-text-field>
                </v-list-tile-content>
            </v-list-tile>
            <div v-if="item !== editingItem">
                <v-btn @click="deleteTodo(item, index)">DELETE</v-btn>
                <v-btn @click="editTodo(item, index)">EDIT</v-btn>
            </div>
            <div v-else>
                <v-btn @click="cancelEditing">CANCEL</v-btn>
                <v-btn @click="updateMessage(item, itemText)">UPDATE</v-btn>
            </div>
      </template>
    </v-list>
</div>
</template>

<script>
import * as firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3p8_vXGN2I_M6gT8GpBIUnjISGUwrH8A",
  authDomain: "vue-works.firebaseapp.com",
  databaseURL: "https://vue-works.firebaseio.com",
  projectId: "vue-works",
  storageBucket: "vue-works.appspot.com",
  messagingSenderId: "897883747796"
};
firebase.initializeApp(config);
var database = firebase.database()

export default {
    data(){
        return {
           items: [],
           editingItem: null
        };
    },
    methods:{
        createTodo(name){
            if(name != null){
                //this.items.push({title:name});
                database.ref('TodoList').push({title:name});
                this.name = null;
            }
        },
        deleteTodo(item, index){
            this.items.splice(index,1);
            database.ref('TodoList').child(item.id).remove();
        },
        editTodo(item){
            this.editingItem = item;
        },
        cancelEditing(){
            this.editingItem = ''
        },
        updateMessage(item, itemText){
            database.ref('TodoList').child(item.id).update({title: itemText})
            this.itemText = null;
            this.cancelEditing();
        }
    },
    mounted() {
    }, 
    created(){
        // value = snapshot.val() | key = snapshot.key
        database.ref('TodoList').on('child_added', snapshot => this.items.push({...snapshot.val(), id: snapshot.key}))

        database.ref('TodoList').on('child_changed', snapshot => {
             const updateMessage = this.items.find(item => item.id === snapshot.key)
             const index = this.items.indexOf(updateMessage)
             this.items[index].title = snapshot.val().title
        })
    }
}
</script>

