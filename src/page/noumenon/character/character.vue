<template>
    <div>
        <noumenon_title :title="this.title">
            <noumenon_button slot="children" :noumenon_number="char_number"></noumenon_button>
        </noumenon_title>

            <div class=" zxw-characterbody">
                <p class="zxwspan-length">人名：</p>
                <p class="zxw-info-width" v-model="person_content.name">{{person_content.name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">英译：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.english === ''">不详</p>
                <p class="zxw-info-width" v-model="person_content.english" v-else>{{person_content.english}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">姓：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.xing === ''">不详</p>
                <span class="zxw-info-width" v-model="person_content.xing" v-else>{{person_content.xing}}</span>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">氏：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.shi === ''">不详</p>
                <p class="zxw-info-width" v-model="person_content.shi" v-else>{{person_content.shi}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">字：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.zi === ''">不详</p>
                <p class="zxw-info-width" v-model="person_content.zi" v-else>{{person_content.zi}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">别名：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.other_name === ''">不详</p>
                <p class="zxw-info-width" v-model="person_content.other_name" v-else>{{person_content.other_name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">出生时间：</p>
                <button class="zxwbtn-info zxw-info-width" v-model="person_content.birth_time_name,person_content.birth_time_id" @click="go_birth_time()">{{person_content.birth_time_name}}</button>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">死亡时间：</p>
                <button class="zxwbtn-info zxw-info-width" v-model="person_content.death_time_name,person_content.death_time_id" @click="go_dead_time()">{{person_content.death_time_name}}</button>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">籍贯：</p>
                <p class="zxw-info-width zxw-null" v-if="person_content.jiguan_location_name === ''">不详</p>
                <button class="zxwbtn-info zxw-info-width" v-model="person_content.jiguan_location_id,person_content.jiguan_location_name" v-else>{{person_content.jiguan_location_name}}</button>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">父：</p>
                <p class="zxw-info-width zxw-null" v-if="father.length === 0">不详</p>
                <button class="zxwbtn-info zxw-info-width" v-model="father[0]"  @click="to_character(father[0].person_id)" v-else>{{father[0].person_name}}</button>

            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">母：</p>
                <p class="zxw-info-width zxw-null" v-if="mother.length === 0">不详</p>
                <button class="zxwbtn-info zxw-info-width" v-model="mother[0]" @click="to_character(mother[0].person_id)" v-else>{{mother[0].person_name}}</button>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">子：</p>
                <p class="zxw-info-width zxw-null" v-if="son.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in son" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="son.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">女：</p>
                <p class="zxw-info-width zxw-null" v-if="daughter.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in daughter" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="daughter.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">兄弟：</p>
                <p class="zxw-info-width zxw-null" v-if="brother.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in brother" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="brother.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">姐妹：</p>
                <p class="zxw-info-width zxw-null" v-if="sister.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in sister" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="sister.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">师：</p>
                <p class="zxw-info-width zxw-null" v-if="teacher.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in teacher" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="teacher.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">学生：</p>
                <p class="zxw-info-width zxw-null" v-if="student.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in student" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="student.length > 1"> ;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">友：</p>
                <p class="zxw-info-width zxw-null" v-if="friend.length === 0">不详</p>
                <template v-else>
                    <button class="zxwbtn-info zxw-info-width"  v-for="(item,index) in friend" @click="to_character(item.person_id)">{{item.person_name}} <span v-if="friend.length > 1"> ;</span></button>
                </template>
            </div>

        <template v-if="person_content.remark_1_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="person_content.remark_1_name">{{person_content.remark_1_name}} :</p>
                <p class="zxwspan-length-content" v-model="person_content.remark_1">{{person_content.remark_1}}</p>
            </div>
        </template>

        <template v-if="person_content.remark_2_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="person_content.remark_2_name">{{person_content.remark_2_name}} :</p>
                <p class="zxwspan-length-content" v-model="person_content.remark_2">{{person_content.remark_2}}</p>
            </div>
        </template>
            <button  class="zxwnoumenom-button zxwdelete-character" @click="open_delete_character()">删除本体</button>

        <delete_modal :open_modal="open_modal" :delete_warning="'确认删除本体?'" v-on:close_modal="close_modal" v-on:delete_info="delete_character"></delete_modal>

        <fail_delete :show_info="show_info" :tip="'该本体已被其他本体引用,无法删除'" v-on:close_modal="close_fail_delete"></fail_delete>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');

    Mock.mock('/ancient_books/getToken.action','get', {
        "token|100":100,
    });

     //显示用户列表
     Mock.mock('/ancient_books/get_person_by_id.action?id=1','get',{
     "status|200":200,
     "standard_name":'鹿晗(宋朝)',
     "name":'鹿晗',
     "english": '',
     "xing": '',
     "shi": 'shi',
     "zi":'zi',
     "other_name":'小姐夫',
     "birth_time_id": '27',
     "birth_time_name": '宋朝',
     "death_time_id": '25',
     "death_time_name": '天朝1992',
     "jiguan_location_id":'27',
     "jiguan_location_name":'北京',
     "remark_1_name": '',
     "remark_2_name": '',
     "remark_1":'',
     "remark_2": '',
     "relations": [

         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|122": 122,
             "person_name": '武则天'
         },
         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": '迪丽热巴'
         },
         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": '陈赫'
         },
         {
             "relation_type|7": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": 'hr'
         },
         {
             "relation_type|8": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": 'ghd'
         },
         {
             "relation_type|9": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": 'ffj'
         },
         {
             "relation_type|10": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": 'tny'
         },
         {
             "relation_type|11": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": 'scdhj'
         }]
     });

    Mock.mock('/ancient_books/get_person_by_id.action?id=122','get',{
        "status|200":200,
        "standard_name":'武则天（唐朝）',
        "name":'武则天',
        "english|6": 6,
        "xing|5": 5,
        "shi|5": 5,
        "zi|5":5,
        "other_name|7":7,
        "birth_time_id": 1,
        "birth_time_name|1996": 1,
        "death_time_id|0": 0,
        "death_time_name|0": 0,
        "jiguan_location_id|555":1,
        "jiguan_location_name|555":1,
        "remark_1_name|1": 1,
        "remark_2_name|2": 1,
        "remark_1|111":1,
        "remark_2": '',
        "relations": [{
            "relation_type|4": 1,
            "relation_id|1-100": 1,
            "person_id|100-1000": 1,
            "person_name|10000": 1
        },
            {
                "relation_type|5": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            },
            {
                "relation_type|6": 1,
                "relation_id|1-100": 1,
                "person_id|1": 1,
                "person_name": '鹿晗'
            },
            {
                "relation_type|6": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name": '迪丽热巴'
            },
            {
                "relation_type|6": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name": '陈赫'
            },
            {
                "relation_type|7": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            },
            {
                "relation_type|8": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            },
            {
                "relation_type|9": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            },
            {
                "relation_type|10": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            },
            {
                "relation_type|11": 1,
                "relation_id|1-100": 1,
                "person_id|100-1000": 1,
                "person_name|10000": 1
            }]
    });

    Mock.mock('/ancient_books/delete_person_by_id.action','post', {
        "status|200":200,
        "result|0":0,
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import fail_delete from '../../../component/warning_noumenon.vue';
    export default{
        created(){
            this.person_info();
        },
        components:{
            noumenon_title,
            noumenon_button,
            delete_modal,
            fail_delete
        },
        data(){
            return{
                show_info:false,
                char_number:1,
                title:'',
                get_person_url:'/ancient_books/get_person_by_id.action',
                delete_character_url:'/ancient_books/delete_person_by_id.action',
                person_content:{},  //成功回调后的对象
                father:[],
                mother:[],
                son:[],
                daughter:[],
                brother:[],
                sister:[],
                teacher:[],
                student:[],
                friend:[],
                delete_info:'',
                open_modal:false
            }
        },

        watch:{
            $route(){
                this.person_content={};
                this.father.splice(0,this.father.length);
                this.mother.splice(0,this.mother.length);
                this.son.splice(0,this.son.length);
                this.daughter.splice(0,this.daughter.length);
                this.brother.splice(0,this.brother.length);
                this.sister.splice(0,this.sister.length);
                this.teacher.splice(0,this.teacher.length);
                this.student.splice(0,this.student.length);
                this.friend.splice(0,this.friend.length);
                this.person_info();
            }
        },

        methods:{
            success_id(response){
                //存在前端显示的数组里
                this.title = response.body.standard_name;
                this.person_content.standard_name = response.body.standard_name;
                this.person_content.name = response.body.name;
                this.person_content.english = response.body.english;
                this.person_content.xing = response.body.xing;
                this.person_content.shi = response.body.shi;
                this.person_content.zi = response.body.zi;
                this.person_content.other_name = response.body.other_name;
                this.person_content.birth_time_id = response.body.birth_time_id;
                this.person_content.birth_time_name = response.body.birth_time_name;
                this.person_content.death_time_id = response.body.death_time_id;
                this.person_content.death_time_name = response.body.death_time_name;
                this.person_content.jiguan_location_id = response.body.jiguan_location_id;
                this.person_content.jiguan_location_name = response.body.jiguan_location_name;
                this.person_content.remark_1_name = response.body.remark_1_name;
                this.person_content.remark_2_name = response.body.remark_2_name;
                this.person_content.remark_1 = response.body.remark_1;
                this.person_content.remark_2 = response.body.remark_2;
                if(response.body.relations.length > 0) {
                    for (let i = 0; i < response.body.relations.length; i++) {
                        if (response.body.relations[i].relation_type === 4) {
                            this.father.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.father));

                        } else if (response.body.relations[i].relation_type === 5) {
                            this.mother.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.mother));

                        } else if (response.body.relations[i].relation_type === 6) {
                            this.son.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.son));

                        } else if (response.body.relations[i].relation_type === 7) {
                            this.daughter.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.daughter));

                        } else if (response.body.relations[i].relation_type === 8) {
                            this.brother.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.brother));

                        } else if (response.body.relations[i].relation_type === 9) {
                            this.sister.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.sister));

                        } else if (response.body.relations[i].relation_type === 10) {
                            this.teacher.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.teacher));

                        } else if (response.body.relations[i].relation_type === 11) {
                            this.student.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.student));

                        } else if (response.body.relations[i].relation_type === 12) {
                            this.friend.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.friend));
                        }
                    }
                }
                console.log(JSON.stringify(this.person_content));
            },

            fail_id(response){
                console.log("具体显示人物失败");
            },

            person_info(){
                let person_object={};
                let new_url = this.get_person_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',person_object,this.success_id,this.fail_id);
            },

            open_delete_character(){
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
            },

            delete_character(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_character_url,'post',delete_object,this.success_delete,this.fail_delete);
            },

            success_delete(response){
                this.$router.push({path:'/noumenon'});
            },

            fail_delete(response){
                this.open_modal = false;
                this.show_info = true;
            },

            to_character(p){
                this.$router.push({name:'char_detail',params:{nouId:p}});
            },

            go_birth_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.person_content.birth_time_id}});
            },

            go_dead_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.person_content.death_time_id}});
            },

            close_fail_delete(){
                this.show_info = false;
            }
        }
    }
</script>

<style>
    /*人物本体详情内容与标题距离*/
    .zxw-characterbody{
        margin:40px 0 0 40px;
    }

    /*删除本体button距离*/
    .zxwdelete-character{
        width:140px;
        height:45px;
        margin: 37px 0 0 30px;
    }

    /*详情内的button*/
    .zxwbtn-info{
        text-align: left;
        background-color: transparent;
        border-style: none;

    }

    /*各内容之间的间距*/
    .zxw-infospan {
        margin: 17px 0 0 40px;
    }


    .zxwspan-length{
        font-size: 18px;
        font-weight: bold;
        width:100px;
        display:inline-block;
    }

    .zxw-info-width{
        font-size: 18px;
        font-weight: bold;
        width:auto;
        display:inline-block;
    }

    .zxwspan-length-content{
        font-size: 18px;
        font-weight: bold;
        display:inline-block;
    }

    .zxw-detail-info{
        font-size: 18px;
        font-weight: bold;
        display:inline-block;
    }
</style>