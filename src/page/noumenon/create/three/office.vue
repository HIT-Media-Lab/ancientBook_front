<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_off.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">职官名：</label>
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_off.office_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_off.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-null zxw-display-list-margin" readonly value="不详" v-if="this.$store.getters.get_build_off.other_name === '' " >
            <input type="text" class="zxw-character-input-content  zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_off.other_name" v-else>
            <label class="zxw-character-span">隶属机构：</label>
            <p class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_off.institution_name === ''">不详</p>
            <p class="zxw-character-input-content zxw-display-cursor" v-model="this.$store.getters.get_build_off.institution_name" @click="show_details_ins()" v-if="this.$store.getters.get_build_off.begin_standard_time !== '' && show_details[0] === false">{{$store.getters.get_build_off.institution_name}}</p>
            <p class="zxw-display-list" v-model="this.$store.getters.get_build_off.institution_name" @click="show_details_ins()" v-if="this.$store.getters.get_build_off.institution_name !== '' && show_details[0] === true">{{$store.getters.get_build_off.institution_name}}</p>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">起始时间：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_off.begin_standard_time" @click="show_details_begin()" v-if="this.$store.getters.get_build_off.begin_standard_time !== '' && show_details[1] === false">{{$store.getters.get_build_off.begin_standard_time}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_off.begin_standard_time" @click="show_details_begin()" v-if="this.$store.getters.get_build_off.begin_standard_time !== '' && show_details[1] === true">{{$store.getters.get_build_off.begin_standard_time}}</p>
            <label class="zxw-character-span">终止时间：</label>
            <p class="zxw-character-input-content zxw-display-cursor" v-model="this.$store.getters.get_build_off.end_standard_time" @click="show_details_end()" v-if="this.$store.getters.get_build_off.end_standard_time !== '' && show_details[2] === false">{{$store.getters.get_build_off.end_standard_time}}</p>
            <p class="zxw-display-list" v-model="this.$store.getters.get_build_off.end_standard_time" @click="show_details_end()" v-if="this.$store.getters.get_build_off.end_standard_time !== '' && show_details[2] === true">{{$store.getters.get_build_off.end_standard_time}}</p>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">上级职官：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_off.s_office_name === ''">不详</p>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_off.s_office_name" @click="show_details_off()" v-if="this.$store.getters.get_build_off.s_office_name !== '' && show_details[3] === false">{{$store.getters.get_build_off.s_office_name}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_off.s_office_name" @click="show_details_off()" v-if="this.$store.getters.get_build_off.s_office_name !== '' && show_details[3] === true">{{$store.getters.get_build_off.s_office_name}}</p>

            <label class="zxw-character-span">品级：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.selected_level.chinese_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">所属朝代：</label>
            <input type="text" class="zxw-character-input-content zxw-display-list-margin zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_off.dynasty === ''">
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_off.dynasty" v-else>
        </div>

        <template v-if="this.$store.getters.get_build_off.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_off.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.remark_2">
            </div>
        </template>
        <div class="zxw-build-step2-btn">
            <router-link to="/offtwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()">确认</button>
        </div>
        <success_create :show_info="show_info"></success_create>
    </div>

</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    export default{
        beforeRouteLeave (to, from, next){
            if(to.name !== 'officetwo') {
                //清空Vuex
                this.$store.getters.get_build_off.standard_name = '';
                this.$store.getters.get_build_off.office_name = '';
                this.$store.getters.get_build_off.level = 0;
                this.$store.getters.get_build_off.english = '';
                this.$store.getters.get_build_off.other_name = '';
                this.$store.getters.get_build_off.dynasty = '';
                this.$store.getters.get_build_off.institution_name = '';
                this.$store.getters.get_build_off.institution_id = '';
                this.$store.getters.get_build_off.s_office_id = '';
                this.$store.getters.get_build_off.s_office_name = '';
                this.$store.getters.get_build_off.selected_level.item_1_id = 0;
                this.$store.getters.get_build_off.selected_level.chinese_name = '';
                this.$store.getters.get_build_off.begin_time_id = '';
                this.$store.getters.get_build_off.begin_standard_time = '';
                this.$store.getters.get_build_off.end_time_id = '';
                this.$store.getters.get_build_off.end_standard_time = '';
                this.$store.getters.get_build_off.remark_1_name = '';
                this.$store.getters.get_build_off.remark_2_name = '';
                this.$store.getters.get_build_off.remark_1 = '';
                this.$store.getters.get_build_off.remark_2 = '';
                //模态框自动关闭
                if(this.show_info === true){
                    window.setTimeout(function () {
                        this.show_info = false;
                        next();
                    }, 1500);

                } else{
                    next();
                }

            } else {
                next();
            }

        },

        components:{
            create_word,
            success_create
        },

        created(){
            this.prams = this.$route.name;
        },

        computed:{
            show_remark(){
                if( this.$store.getters.get_build_off.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_off.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_off.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_off.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                prams:'',
                show_details:[false,false,false,false],
                show_info:false,
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_off:{},
                create_off_url:'/ancient_books/add_office.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'off_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建职官本体失败");
            },

            open_confirm(){
                this.create_off.standard_name = this.$store.getters.get_build_off.standard_name;
                this.create_off.office_name = this.$store.getters.get_build_off.office_name;
                this.create_off.level = this.$store.getters.get_build_off.selected_level.item_1_id;
                this.create_off.english = this.$store.getters.get_build_off.english;
                this.create_off.other_name = this.$store.getters.get_build_off.other_name;
                this.create_off.begin_time_id = this.$store.getters.get_build_off.begin_time_id;
                this.create_off.end_time_id = this.$store.getters.get_build_off.end_time_id;
                this.create_off.remark_1_name = this.$store.getters.get_build_off.remark_1_name;
                this.create_off.remark_1 = this.$store.getters.get_build_off.remark_1;
                this.create_off.remark_2_name = this.$store.getters.get_build_off.remark_2_name;
                this.create_off.remark_2 = this.$store.getters.get_build_off.remark_2;
                this.create_off.s_office_id = this.$store.getters.get_build_off.s_office_id;
                this.create_off.institution_id = this.$store.getters.get_build_off.institution_id;
                this.create_off.dynasty = this.$store.getters.get_build_off.dynasty;
                this.http_json(this.create_off_url,'post',this.create_off,this.success_create,this.fail_create);
            },

            show_details_ins(){
                if(this.show_details[0] === false && this.$store.getters.get_build_off.institution_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,true);
                } else if(this.show_details[0] === true && this.$store.getters.get_build_off.institution_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,false);
                }
            },

            show_details_begin(){
                if(this.show_details[1] === false && this.$store.getters.get_build_off.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,true);
                } else if(this.show_details[1] === true && this.$store.getters.get_build_off.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,false);
                }
            },

            show_details_end(){
                if(this.show_details[2] === false && this.$store.getters.get_build_off.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(2,1,true);
                } else if(this.show_details[2] === true && this.$store.getters.get_build_off.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(2,1,false);
                }
            },

            show_details_off(){
                if(this.show_details[3] === false && this.$store.getters.get_build_off.s_office_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(3,1,true);
                } else if(this.show_details[3] === true && this.$store.getters.get_build_off.s_office_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(3,1,false);
                }
            }
        }
    }
</script>
