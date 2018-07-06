<template>
<div>
    <v-container>
        <v-form v-model="valid">
            <v-text-field 
                v-model="name" 
                required 
                prepend-icon="work" 
                label="Work"
                :rules="[rules.required]"
            ></v-text-field>
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                full-width
                width="290px">
                <v-text-field
                slot="activator"
                v-model="date"
                label="Picker in Date"
                prepend-icon="event"
                readonly
                required
                :rules="[rules.required]"></v-text-field>
                <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            <v-dialog
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="time"
                full-width
                width="290px">
                <v-text-field
                slot="activator"
                v-model="time"
                label="Picker in Time"
                prepend-icon="access_time"
                readonly
                required
                :rules="[rules.required]"></v-text-field>
                <v-time-picker v-model="time" actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog2.save(time)">OK</v-btn>
                </v-time-picker>
            </v-dialog>
            <v-card height="56px">
                <v-bottom-nav :active.sync="bottomNav" :color="importantColor" :value="true" absolute shift>
                    <v-btn dark @click="important = 1">
                        <span>Less Important</span>
                        <v-icon>star</v-icon>
                    </v-btn>
                    <v-btn dark @click="important = 3">
                        <span>Important</span>
                        <v-icon>star</v-icon>
                    </v-btn>
                    <v-btn dark @click="important = 5">
                        <span>Very Important</span>
                        <v-icon>star</v-icon>
                    </v-btn>
                </v-bottom-nav>
            </v-card>
        </v-form>
        <v-btn block color="blue-grey darken-4" class="white--text" @click="createTodo"><v-icon>add</v-icon></v-btn>
        <v-list two-line>
            <template v-for="(item,index) in items">
                <v-list-tile :key="item.title">
                    <!--<v-checkbox color="red darken-3" v-model="item.itemCheck" :value="item.itemCheck" @click="checkTodo(item, !item.itemCheck)"></v-checkbox>
                    -->
                    <v-list-tile-content>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_title" v-text="item.title"></v-list-tile-title>
                        <v-text-field v-else v-model="itemText" required></v-text-field>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_date" v-text="'Until Time : ' + item.date"></v-list-tile-title>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_time" v-text="item.time"></v-list-tile-title>
                        <v-list-tile-title class="list_item_important"><v-icon small color="deep-orange" v-for="item in item.important">star</v-icon></v-list-tile-title>
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
        <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
            <v-icon>swap_vertical_circle</v-icon>
            <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab dark small color="green" @click="sortByAlpha(item)">
            <v-icon>sort_by_alpha</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="sortByDate(item)">
            <v-icon>today</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click="sortByImportant(item)">
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
            name: null,
            items: [],
            editingItem: null,
            itemCheck: false,
            user : firebase.auth().currentUser,
         
            fab: false,
            transition: 'slide-y-reverse-transition',

            date: null,
            time: null,
            modal: false,
            modal2: false,

            bottomNav: 1,
            important: 3,

            rules:{
                required: value => !!value || 'Required.'
            }
        };
    },
    methods:{
        createTodo(){
            if(this.name != null && this.date != null && this.time != null){
                const todoData = {
                    title : this.name,
                    date : this.date,
                    time : this.time,
                    important : this.important,
                    itemCheck : false
                }
                this.$store.dispatch('createTodo', todoData)
                //database.ref('TodoList').push({title:name, itemCheck:false});
                this.name = null
                this.date = null
                this.time = null
            }
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

        sortByAlpha(){
            console.log(this.items);
            this.items.sort(function(a,b){
                if (a['title'] > b['title']) return 1
                if (a['title'] < b['title']) return -1
            })
        },
        sortByDate(){
            console.log(this.items);
            this.items.sort(function(a,b){
                if (a['date'] > b['date'])
                {
                    return 1
                }else if (a['date'] < b['date'])
                {   
                    return -1
                }else{
                    if (a['time'] > b['time']) return 1
                    if (a['time'] < b['time']) return -1
                }
            })
        },
        sortByImportant(){
            console.log(this.items);
            this.items.sort(function(a,b){
                if (a['important'] > b['important']) return -1
                if (a['important'] < b['important']) return 1
            })
        }
    },
    computed : {
        importantColor () {
            switch (this.bottomNav) {
                case 0: return 'blue-grey'
                case 1: return 'teal'
                case 2: return 'red'
            }
        }
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
nav.toolbar--fixed{z-index:10;}
.theme--light .application--wrap .container .list{margin:20px 0 0 0;background:none;}
.theme--light .application--wrap .container .list > div{margin:10px 0 0 0;background:#fff;border:1px solid #263238;border-radius:3px;width:100%;float:right;}
.theme--light .application--wrap .container .list > .btn-wrap{background:none;}
.theme--light .application--wrap .container .list .input-group__details{min-height:1px;}
.theme--light .application--wrap .container .list .btn{margin:6px 0;min-width:40px;}
.theme--light .application--wrap .container .list .list__tile__title{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}
.theme--light .application--wrap .container .list .input-group__input input{font-family:"NotoSansKR", sans-serif;font-size:14px;font-weight:900;}
.theme--light .application--wrap .container .list .list_item_date{position:absolute;bottom:0;left:0px;font-size:12px;background:#000;opacity:0.4;color:#fff;padding:0 0 0 16px;height:18px;line-height:18px;}
.theme--light .application--wrap .container .list .list_item_time{position:absolute;bottom:0;left:158px;width:auto;font-size:12px;color:#fff;height:18px;line-height:18px;}
.theme--light .application--wrap .container .list .list_item_important{position:absolute;top:-3px;right:15px;width:auto;}
.theme--light .application--wrap .container .list .list_item_title{height:36px;line-height:16px;}

.speed-dial{position:fixed !important;right:10px;bottom:10px;z-index:10;}
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