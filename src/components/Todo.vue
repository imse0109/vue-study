<template>
<div>
    <v-container>
        <v-form v-model="valid">
            <v-text-field
            v-model="name"
            required
            v-on:keyup.enter="createTodo"
            ></v-text-field>
        </v-form>
        <v-btn block color="blue-grey darken-4" class="white--text" @click="createTodo"><v-icon>add</v-icon></v-btn>
        <v-list two-line>
            <template v-for="(item,index) in items">
                <v-list-tile :key="item.title">
                    <!--<v-checkbox color="red darken-3" v-model="item.itemCheck" :value="item.itemCheck" @click="checkTodo(item, !item.itemCheck)"></v-checkbox>
                    -->
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
                        <v-btn color="blue-grey darken-4" class="white--text" small @click="updateMessage(item, itemText, index)"><v-icon>done</v-icon></v-btn>
                    </div>
                </v-list-tile>
            </template>
        </v-list>
    </v-container>
    <v-speed-dial v-model="fab">
        <v-btn
            slot="activator"
            v-model="fab"
            color="blue darken-2"
            dark
            fab>
            <v-icon>swap_vertical_circle</v-icon>
            <v-icon>close</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="green"
            @click="sortByItems(item)">
            <v-icon>sort_by_alpha</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="indigo">
            <v-icon>today</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="red">
            <v-icon>star</v-icon>
        </v-btn>
    </v-speed-dial>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return {
            name:null,
            items: [],
            editingItem: null,
            itemCheck: false,
            user : firebase.auth().currentUser,
         
            fab: false,
            transition: 'slide-y-reverse-transition'
        };
    },
    methods:{
        createTodo(){
            if(name != null){
                const todoData = {
                    title : this.name,
                    itemCheck : false
                }
                this.$store.dispatch('createTodo', todoData)
                //database.ref('TodoList').push({title:name, itemCheck:false});
            }
            this.name = null
        },
        deleteTodo(item, index){
            const itemId = this.items[index].id
            this.items.splice(index,1);
            this.$store.dispatch('deleteTodo', itemId)
            
            //firebase.database().ref(this.user.uid).child(item.id).remove();
        },
        editTodo(item){
            this.editingItem = item;
        },
        //checkTodo(item, itemCheckValue){
        //    firebase.database().ref(this.user.uid).child(item.id).update({itemCheck:itemCheckValue});
        //},
        cancelEditing(){
            this.editingItem = ''
        },
        updateMessage(item, itemText, index){
            const itemGroup = {
                itemId : this.items[index].id,
                itemText : itemText
            }
            this.$store.dispatch('updateMessage', itemGroup)
            //firebase.database().ref(this.user.uid).child(item.id).update({title: itemText})
            this.itemText = null;
            this.cancelEditing();
        },

        sortByItems(){
            console.log(this.items);
            this.items.sort(function(a,b){return a['title'] > b['title']})
        }
    },
    computed : {
    },
    created(){
        //this.items.push({...snapshot.val(), id: snapshot.key})
        // value = snapshot.val() | key = snapshot.key
        firebase.database().ref(this.user.uid).on('child_added', snapshot => this.items.push({...snapshot.val(), id: snapshot.key}))

        firebase.database().ref(this.user.uid).on('child_changed', snapshot => {
             const updateMessage = this.items.find(item => item.id === snapshot.key)
             const index = this.items.indexOf(updateMessage)
             this.items[index].title = snapshot.val().title
        })
    }
}
</script>

<style>
.content{padding:56px 0 !important;}
.theme--light .application--wrap .container .list{margin:20px 0 0 0;background:none;}
.theme--light .application--wrap .container .list > div{margin:10px 0 0 0;background:#fff;border:1px solid #263238;border-radius:3px;width:100%;float:right;}
.theme--light .application--wrap .container .list > .btn-wrap{background:none;}
.theme--light .application--wrap .container .list .input-group__details{min-height:1px;}
.theme--light .application--wrap .container .list .btn{margin:6px 0;min-width:40px;}
.theme--light .application--wrap .container .list .list__tile__title{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}
.theme--light .application--wrap .container .list .input-group__input input{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}

.speed-dial{position:fixed !important;right:0;bottom:0;}
.speed-dial .btn--floating .icon{top:25% !important;position:absolute;}

/*
.theme--light .application--wrap .input-group.checkbox{position:absolute;top:26px;left:-37px;width:auto;}

.theme--light .application--wrap .input-group.checkbox{position:absolute;top:0;left:0;height:100%;}
.theme--light .application--wrap .input-group.checkbox label{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;color:#000;top:21px;left:16px;}
.theme--light .application--wrap .input-group.checkbox .input-group__input{height:100%;}
.theme--light .application--wrap .input-group.checkbox .input-group__input i{display:none;}
.theme--light .application--wrap .input-group.checkbox .input-group__input div{width:100%;height:100%;top:0;transform:translate(0);border-radius:0;}
.theme--light .application--wrap .input-group.checkbox .input-group__input div:before{display:none;}
.theme--light .application--wrap .input-group.checkbox.input-group--active .input-group__input div{background:#ffc107;opacity:0.7;}
*/
</style>