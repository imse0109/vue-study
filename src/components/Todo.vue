<template>
<div class="todo">
    <v-container>


        <v-expansion-panel>
            <v-expansion-panel-content>
                <div slot="header">Input</div>
                <v-form v-model="valid">
                    <v-select
                        v-model="kind"
                        :items="categoryList"
                        label="Category"
                        prepend-icon="list"
                    ></v-select>
                    <v-text-field 
                        v-model="name" 
                        required 
                        prepend-icon="work" 
                        label="Work"
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
                        ></v-text-field>
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
                        ></v-text-field>
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
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header">Search</div>
                <v-select
                    v-model="schCategory"
                    :items="categoryList"
                    label="Search Category..."
                    prepend-icon="list"
                    @input="searchCategory"
                ></v-select>
                <v-text-field
                    v-model="schWord" 
                    prepend-icon="search"
                    label="Search Word..."
                    @keyup="searchCategory"
                ></v-text-field>
                </v-expansion-panel-content>
        </v-expansion-panel>

        <v-list two-line>
            <template v-for="(item,index) in items">
                <v-list-tile :key="item.title + index" v-show="item.filtered == 'y'">
                    <v-checkbox v-if="item !== editingItem" color="red darken-3" v-model="item.itemCheck" :value="item.itemCheck" @click="checkTodo(item, !item.itemCheck, index)"></v-checkbox>
                    
                    <v-list-tile-content>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_title" v-text="item.title"></v-list-tile-title>
                        <v-text-field v-else v-model="itemText" required></v-text-field>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_date" v-text="'Until Time : ' + item.date"></v-list-tile-title>
                        <v-list-tile-title v-if="item !== editingItem" class="list_item_time" v-text="item.time"></v-list-tile-title>
                        <v-list-tile-title class="list_item_important">
                            <v-icon small color="deep-orange" v-for="item in item.important" :key="item">star</v-icon>
                        </v-list-tile-title>
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

            kind: null,
            schCategory: 'All',
            schWord: '',
            filtered: 'y',
            categoryList: [
                'All',
                'Transactional',
                'Personal',
            ],

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
                    kind : this.kind,
                    filtered : 'y',
                    itemCheck : false
                }
                this.$store.dispatch('createTodo', todoData)
                //database.ref('TodoList').push({title:name, itemCheck:false});
                this.name = null
                this.date = null
                this.time = null
                this.kind = null
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
        checkTodo(item, itemCheckValue, index){
            console.log(item);
            const itemGroup = {
                itemId : this.items[index].id,
                itemCheckValue : itemCheckValue
            }
            this.$store.dispatch('checkTodo', itemGroup)
            //firebase.database().ref(this.user.uid).child(item.id).update({itemCheck:itemCheckValue});
        },
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
        },


        searchCategory(){
            var isFiltered = true;
            for(var i=0;i<this.items.length;i++){
                isFiltered = true;
                
                if(this.schCategory !== 'All' && this.items[i].kind !== this.schCategory){
                    isFiltered = false;
                }
                if(isFiltered && this.items[i].title.toUpperCase().indexOf(this.schWord.toUpperCase()) == -1){
                    isFiltered = false;
                }

                if(isFiltered){
                    this.items[i].filtered = 'y';
                }else{
                    this.items[i].filtered = 'n';
                }
            }
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
