<template>
<div class="mine_search">
    <v-btn block color="blue-grey darken-4" class="white--text" @click="mineRandom">click</v-btn>
    <ul>
        <template v-for="(item,index) in box">
            <li :key="item + index" v-if="item == mineValue[0]" class="mine">mine</li>
            <li :key="item + index" v-else></li>
        </template>
    </ul>
</div>
</template>
<style>
.mine_search{padding:10px;}
ul{overflow:hidden;list-style:none;border:1px solid #000;}
ul li{float:left;width:10%;height:40px;border:1px solid #000;text-align:center;line-height:38px;}
ul li.mine{color:#fff;background:#263238;}
</style>
<script>
export default {
    data(){
        return {
            mineValue : [],
            mineLength : 10,
            box : 100
        }
    },
    methods:{
        mineRandom() {
            this.mineValue.splice(0,this.mineValue.length);
            for(var i=0;i<this.mineLength;i++){
                this.mineValue.push(Math.floor(Math.random() * 100) + 1);
                console.log(this.mineValue);
            }
        }
    }
}

</script>


