<template>
    <div>
        <!--机构本体标题-->
        <noumenon_title :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>

        <!--字母title-->
        <letter_title></letter_title>

        <!--机构列表-->
        <div class="zxw-noumenon-list">
            <button class="zxw-chadail" @click="go_institution(index)" v-for="(item,index) in institution_data">
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
    Mock.mock('/ancient_books/get_institution_list_by_word.action?word=A&&page_count=1','get',{
        "result|1":1,
        "content|30":[{
            'standard_name':'三省六部',
            'noumenon_id|1':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_institution_list_by_word.action?word=A&&page_count=2','get',{
        "result|1":1,
        "content|2":[{
            'standard_name':'@FIRST',
            'noumenon_id|100-1000':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_institution_list_by_word.action?word=B&&page_count=1','get',{
        "result|1":1,
        "content|10":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_institution_list_by_word.action?word=Q&&page_count=1','get',{
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
                this.get_institution();
                console.log("$route");
            }
        },

        created(){
            this.get_institution();
            console.log("created");
        },

        data(){
            return{
                title:'机构本体',
                total_page:1,   //总页数
                institution_data:[],
                word_url:'/ancient_books/get_institution_list_by_word.action',
                ban:true
            }
        },

        methods:{

            //通过头字母显示人物本体列表
            success_get(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++) {
                    this.institution_data.push(
                        response.body.content[i]
                    );
                }
                console.log('response.body.content.length:'+response.body.content.length);
                console.log('this.institution_data:'+JSON.stringify(this.institution_data));
            },

            fail_get(response){
                console.log("字母显示本体列表失败"+response.body);
            },

            get_institution(){
                let get_letter={};
                let new_url = this.word_url+'?word='+this.$route.params.letterId+'&&page_count='+this.$route.params.pageId;
                this.http_json(new_url,'get',get_letter,this.success_get,this.fail_get);
            },

            //跳转到人物本体详情
            go_institution(p){
                console.log(this.institution_data[p].noumenon_id);
                this.$router.push({name:'ins_detail',params:{nouId:this.institution_data[p].noumenon_id}});
            },

            //清空前端显示数组
            clean_data(){
                this.institution_data.splice(0, this.institution_data.length);
            }
        }

    }
</script>