<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_terms.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">术语名称：</label>
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_terms.terms_name">
            <label class="zxw-character-span">学科：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_terms.selected_course.chinese_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学科小类：</label>
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly value="未有具体数据">
            <label class="zxw-character-span">起始时间：</label>
            <p class="zxw-character-input-content zxw-display-cursor" v-model="this.$store.getters.get_build_terms.birth_standard_name" @click="show_details_begin()" v-if="show_details[0] === false">{{$store.getters.get_build_terms.begin_standard_time}}</p>
            <p class="zxw-display-list" v-model="this.$store.getters.get_build_terms.birth_standard_name" @click="show_details_begin()" v-if="show_details[0] === true">{{$store.getters.get_build_terms.begin_standard_time}}</p>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">终止时间：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_terms.end_standard_time" @click="show_details_end()" v-if="show_details[1] === false">{{$store.getters.get_build_terms.end_standard_time}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_terms.end_standard_time" @click="show_details_end()" v-if="show_details[1] === true">{{$store.getters.get_build_terms.end_standard_time}}</p>
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_terms.other_name === ''">
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_terms.other_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-display-list-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_terms.english === ''">
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_terms.english" v-else>
            <label class="zxw-character-span">解释：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_terms.explain === ''">
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_terms.explain" v-else>
        </div>

        <template v-if="this.$store.getters.get_build_terms.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_terms.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_terms.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_terms.remark_2">
            </div>
        </template>

        <div class="zxw-build-step2-btn">
            <router-link to="/termstwo">
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
            if(to.name !== 'termstwo') {
                //清空Vuex
                this.$store.getters.get_build_terms.standard_name = '';
                this.$store.getters.get_build_terms.terms_name = '';
                this.$store.getters.get_build_terms.course_subdivision = 0;
                this.$store.getters.get_build_terms.selected_course.item_1_id=0;
                this.$store.getters.get_build_terms.selected_course.chinese_name='';
                this.$store.getters.get_build_terms.english = '';
                this.$store.getters.get_build_terms.explain='';
                this.$store.getters.get_build_terms.other_name = '';
                this.$store.getters.get_build_terms.begin_time_id = '';
                this.$store.getters.get_build_terms.begin_standard_time = '';
                this.$store.getters.get_build_terms.end_time_id = '';
                this.$store.getters.get_build_terms.end_standard_time = '';
                this.$store.getters.get_build_terms.remark_1_name = '';
                this.$store.getters.get_build_terms.remark_2_name = '';
                this.$store.getters.get_build_terms.remark_1 = '';
                this.$store.getters.get_build_terms.remark_2 = '';
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
                if( this.$store.getters.get_build_terms.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_terms.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_terms.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_terms.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                prams:'',
                show_details:[false,false],
                show_info:false,
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_terms:{},
                create_terms_url:'/ancient_books/add_technical.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'terms_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建术语本体失败");
            },

            open_confirm(){
                this.create_terms.standard_name = this.$store.getters.get_build_terms.standard_name;
                this.create_terms.technical_name = this.$store.getters.get_build_terms.terms_name;
                this.create_terms.course = this.$store.getters.get_build_terms.selected_course.item_1_id;
                this.create_terms.course_subdivision = this.$store.getters.get_build_terms.course_subdivision;
                this.create_terms.english = this.$store.getters.get_build_terms.english;
                this.create_terms.explain = this.$store.getters.get_build_terms.english;
                this.create_terms.other_name = this.$store.getters.get_build_terms.other_name;
                this.create_terms.begin_time_id = this.$store.getters.get_build_terms.begin_time_id;
                this.create_terms.end_time_id = this.$store.getters.get_build_terms.end_time_id;
                this.create_terms.remark_1_name = this.$store.getters.get_build_terms.remark_1_name;
                this.create_terms.remark_1 = this.$store.getters.get_build_terms.remark_1;
                this.create_terms.remark_2_name = this.$store.getters.get_build_terms.remark_2_name;
                this.create_terms.remark_2 = this.$store.getters.get_build_terms.remark_2;
                this.http_json(this.create_terms_url,'post',this.create_terms,this.success_create,this.fail_create);
            },

            show_details_begin(){
                if(this.show_details[0] === false && this.$store.getters.get_build_terms.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,true);
                } else if(this.show_details[0] === true && this.$store.getters.get_build_terms.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,false);
                }
            },

            show_details_end(){
                if(this.show_details[1] === false && this.$store.getters.get_build_terms.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,true);
                } else if(this.show_details[1] === true && this.$store.getters.get_build_terms.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,false);
                }
            }
        }
    }
</script>
