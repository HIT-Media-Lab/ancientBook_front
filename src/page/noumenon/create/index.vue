<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../assets/img/no-use-picture/create-step1.png" class="zxwcreate-img">
        <create-word :prams="this.prams"></create-word>
        <div class="zxw-noumenon-select">
            <label>选择本体类型：</label>
            <select  class="zxw-select" v-model="noumenon_option[number]" >
                <option v-for="item in noumenon_option">{{item}}</option>
            </select>
        </div>
        <button class="zxw-nextbtn zxw-nextbtn-margin zxw-nextbtn-length" @click="go_step2()">下一步</button>
    </div>
</template>

<script>
import createWord from '../../../component/create-word.vue'
export default{
    created(){
        this.prams = this.$route.name;
        this.number = this.$store.getters.get_create_one_selection;
    },

    components:{
        createWord
    },

    data(){
        return{
            prams:'',
            number:0,
            noumenon_option:['时间','地名','人物','机构','职官','文献','术语'],
        }
    },

    methods:{
        go_step2(){
            console.log(this.noumenon_option[this.number]);
            if(this.noumenon_option[this.number]==='人物'){

                this.$router.push({name:'charactertwo'});

            } else if(this.noumenon_option[this.number]==='地名'){

                this.$router.push({name:'placetwo'});

            } else if(this.noumenon_option[this.number]==='机构'){

                this.$router.push({name:'institutiontwo'});

            } else if(this.noumenon_option[this.number]==='术语'){

                this.$router.push({name:'termstwo'});

            } else if(this.noumenon_option[this.number]==='职官'){

                this.$router.push({name:'officetwo'});

            } else if(this.noumenon_option[this.number]==='时间'){

                this.$router.push({name:'timetwo'});

            } else if(this.noumenon_option[this.number]==='文献'){

                this.$router.push({name:'littwo'});

            }
        },

    }

}
</script>

<style>
    .zxwcreate{
        margin:50px 0  0 180px;
    }

    .zxwcreate-title{
        font-weight: bold;
        font-size: 18px;
    }

    .zxwcreate-img{
        height:150px;
        width:810px;
        margin:0 0 0 80px;
    }

    .zxw-noumenon-select{
        margin: 60px 0 120px 350px;
    }

    .zxw-nextbtn{
        background-image: url("../../../assets/img/button/create-next-step.png");
        background-color: transparent;
        border-style: none;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        color:gainsboro;
    }

    .zxw-nextbtn-margin{
        margin:0 0 0 400px;
    }

    .zxw-nextbtn-length{
        width:125px;
        height:55px;
    }
    .zxw-prebtn{
        background-image: url("../../../assets/img/button/create-pre-step.png");
        background-color: transparent;
        border-style: none;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        color:black;
    }


    .zxw-prebtn-length{
        width:125px;
        height:55px;
    }

    .zxw-select{
        border:2px solid;
        background-color: transparent;
        width:100px;
        height:25px;
    }

</style>