<template>
    <div>
        <!--人物本体标题-->
        <noumenon_title :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>

        <!--字母title-->
        <letter_title></letter_title>

        <!--人物列表-->
        <div class="zxw-noumenon-list">
            <button class="zxw-chadail" @click="go_character(index)" v-for="(item,index) in character_data">
                {{ item.standard_name }}
            </button>
        </div>
        <!--翻页组件-->
        <paginator :max=this.total_page></paginator>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_person_list_by_word.action?word=A&&page_count=1','get',{
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1':1
        }],
        "total_page|20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=A&&page_count=2','get',{
        "result|1":1,
        "content|2":[{
            'standard_name':'@FIRST',
            'noumenon_id|100-1000':1
        }],
        "total_page|20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=B&&page_count=1','get',{
        "result|1":1,
        "content|10":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=Q&&page_count=1','get',{
        "result|1":1,
        "content":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import letter_title from '../../../component/letter-title.vue';
    import paginator from '../../../component/paginator.vue';
    import build_button from '../../../component/build-button.vue';
    export default{
        components:{
            paginator,
            noumenon_title,
            letter_title,
            build_button
        },

        watch:{
            '$route'(){
                this.clean_data();
                this.get_character();
                console.log("$route");
            }
        },

        created(){
            this.get_character();
            console.log("created");
        },

        data(){
            return{
                title:'人物本体',
                total_page:1,   //总页数
                character_data:[],
                word_url:'/ancient_books/get_person_list_by_word.action',
                ban:true
            }
        },

        methods:{

            //通过头字母显示人物本体列表
            success_get(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++) {
                    this.character_data.push({
                        standard_name: response.body.content[i].standard_name,
                        type_id:response.body.content[i].type_id,
                        noumenon_id:response.body.content[i].noumenon_id
                    });
                }
                console.log('response.body.content.length:'+response.body.content.length);
                console.log('this.character_data:'+JSON.stringify(this.character_data));
            },

            fail_get(response){
                console.log("字母显示本体列表失败"+response.body);
            },

            get_character(){
                let get_letter={};
                let new_url = this.word_url+'?word='+this.$route.params.letterId+'&&page_count='+this.$route.params.pageId;
                this.http_json(new_url,'get',get_letter,this.success_get,this.fail_get);
            },

            //跳转到人物本体详情
            go_character(p){
                console.log(this.character_data[p].noumenon_id);
                this.$router.push({name:'char_detail',params:{nouId:this.character_data[p].noumenon_id}});
            },

            //清空前端显示数组
            clean_data(){
                this.character_data.splice(0, this.character_data.length);
            }
        }

    }
</script>

<style>

    .zxw-chadail{
        font-size: 18px;
        text-align: left;
        margin: 0 10px 10px 20px;
        width:400px;
        background-color: transparent;
        border-style: none;
    }

    .zxw-noumenon-list{
        margin-left:80px;
    }

</style>