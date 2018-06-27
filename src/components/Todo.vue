<template>
<div>
  <v-toolbar color="deep-orange">
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-toolbar-title class="white--text">toDo+</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon class="white--text">search</v-icon>
        </v-btn>
        <!--<v-btn icon>
            <v-icon>view_module</v-icon>
        </v-btn>-->
  </v-toolbar>
  <v-container>
    <v-form v-model="valid">
        <v-text-field
        v-model="name"
        :rules="nameRules"
        required
        v-on:keyup.enter="createTodo(name)"
        ></v-text-field>
    </v-form>
    <v-btn block color="blue-grey darken-4" class="white--text" @click="createTodo(name)"><v-icon>add</v-icon></v-btn>
    <v-list two-line>
        <template v-for="(item,index) in items">
            <v-list-tile :key="item.title">
                <v-list-tile-content>
                    <v-list-tile-title v-if="item !== editingItem" v-text="item.title"></v-list-tile-title>
                    <v-text-field v-else v-model="itemText" required></v-text-field>
                </v-list-tile-content>
                <div class="btn-wrap" v-if="item !== editingItem">
                    <v-btn color="blue-grey darken-4" class="white--text" small @click="deleteTodo(item, index)"><v-icon>delete</v-icon></v-btn>
                    <v-btn color="blue-grey darken-4" class="white--text" small @click="editTodo(item, index)"><v-icon>edit</v-icon></v-btn>
                </div>
                <div class="btn-wrap" v-else>
                    <v-btn color="blue-grey darken-4" class="white--text" small @click="cancelEditing"><v-icon>cancel</v-icon></v-btn>
                    <v-btn color="blue-grey darken-4" class="white--text" small @click="updateMessage(item, itemText)"><v-icon>update</v-icon></v-btn>
                </div>
            </v-list-tile>
        </template>
    </v-list>
  </v-container>
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

<style>
.theme--light .application--wrap .list{margin:20px 0 0 0;background:none;}
.list > div{margin:10px 0 0 0;background:#fff;border:1px solid #263238;border-radius:3px;}
.list > .btn-wrap{background:none;}
.input-group__details{min-height:1px;}
.btn{margin:6px 0;min-width:40px;}
.list__tile__title{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}
.input-group__input input{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}
</style>