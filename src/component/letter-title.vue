<template>
    <div class="zxwcharacter-title">   <!--加背景-->
        <div  class="zxwcharacter-row">
            <button  class="zxwcharacter-span" v-for="(item,index) in group_1" v-model=group_1.item  @click="go_letter(item)" v-bind:class="{hover: $route.params.letterId===item}">{{item}}</button>
        </div>

        <div  class="zxwcharacter-row">
            <button class="zxwcharacter-span" v-for="(item,index) in group_2" v-model=group_2.item @click="go_letter(item)" v-bind:class="{hover: $route.params.letterId===item}">{{item}}</button>
        </div>

        <div  class="zxwcharacter-row" >
            <button class="zxwcharacter-span" v-for="(item,index) in group_3" v-model=group_3.item @click="go_letter(item)" v-bind:class="{hover: $route.params.letterId===item}">{{item}}</button>
        </div>

        <div  class="zxwcharacter-row" >
            <button class="zxwcharacter-span" v-for="(item,index) in group_4" v-model=group_4.item @click="go_letter(item)" v-bind:class="{hover: $route.params.letterId===item}">{{item}}</button>
        </div>

        <div  class="zxwcharacter-row" >
            <button class="zxwcharacter-span" v-for="(item,index) in group_5">{{item}}</button>
        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return {
                letter_id:'',
                group_1:['A','B','C','D','E','F','G'],
                group_2:['H','I','J','K','L','M','N'],
                group_3:['O','P','Q','R','S','T'],
                group_4:['U','V','W','X','Y','Z'],
                group_5:['#']
            }
        },

        methods:{
           go_letter(p){
                this.$route.params.letterId = p;
                this.$route.params.pageId = 1;
                this.$router.push({name:this.$route.name, params: this.$route.params});
            }


        }
    }
</script>

<style>
    .zxwcharacter-title{
        margin: 35px 0 47px 40px;
        padding:10px 0 0 40px;
        width:968px;
        height:53px;
        background-image: url("../assets/img/modal-box/letter-index.png");
        background-position: center;
    }

    .zxwcharacter-row{
        margin:0 25px 0 0;
        display:inline-block;
        width:auto;
        height:30px;
    }

    .zxwcharacter-span{
        color:black;
        font-size: 16px;
        width:auto;
        height:20px;
        background-color: transparent;
        border-style: none;
        margin-right: 15px;
        text-align: center;
    }

    .hover{
        color:#a50000;
        font-size:25px;
        font-weight: bold;
        height:30px;

    }
</style>