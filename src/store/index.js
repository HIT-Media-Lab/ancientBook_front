/**
 * Created by Administrator on 2017/4/16.
 */
import Vue        from 'vue'
import Vuex       from 'vuex'
import  actions from './actions'
import  mutations from  './mutations'
import  getters from  './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        show:true,
        ifLogin:'guest',
        Token:'',
        acl_user:
            ['login','404','bookstore','user','upload1','mybook',
            'character','recent','char_detail','char_edit','upload1','upload2',
            'upload3','copy','edition','impression','varieties',
            'char_detail','bookstore','book_recent','book_info',
            'book_varieties','book_edition','book_impression',
            'book_copy','sort_book','search_index','search_book',
            'search_noumenon','modify_info','user_info',
            'alupload','privatebook','collection','offer',
            'ancientbook','comment','revise','edit','mark',
            'build','charactertwo','characterthree'],
        acl_admin:['404','admin','modify_info'],
        acl_guest:['login', '404'],
        a:{},
        menu_items:[],
        copy_contents:{
            duplicate_book_count : '',
            duplicate_level : 1,
            duplicate_complete : 1,
            duplicate_attachment : '',
            copy_responsibility : [{
                value:true,
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 4,
            }]
        },
        edition_contents:{
            version_volume : '',
            version_type : 1,
            version_age : 1,
            version_support : 1,
            version_binding : 1,
            version_frame_length : '',
            version_frame_width : '',
            version_format_length : '',
            version_format_width : '',
            version_paiji_content : '',
            version_paiji_location : '',
            version_half_page_line_number : '',
            version_page_line_number : '',
            version_yuwei : 1,
            version_double_page_number : '',
            version_bianlan : 1,
            version_fenlan : 1,
            version_shukou : 1,
            version_banxin_content : '',
            version_youshuwuer : '',
            version_youwujiazhu  : 1,
            edition_responsibility : [{
                value : true,
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 2,
            }]
        },
        impression_contents:{
            printing_type : 1,
            printing_number : '',
            impression_responsibility : [{
                value : true,
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 3,
            }]
        },
        varieties_contents:{
            type_name : '',
            type_other_name : '',
            english : '',
            type_save : 1,
            type_level : 1,
            type_bu : 1,
            type_lei : 1,
            type_shu : 1,
            type_summary : '',
            literature_standard_name : '',
            varieties_responsibility : [{
                value : true,
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 1,
            }]
        },
        book_summary:'',
        upload_file : [{
            value : true,
            book_name : '',
            book_num : '',
            images : [],
            texts : [],
        }],
        text_name : [],
        upload1_info:{},
        create_character:{
            standard_name:'',
            person_name:'',
            xing:'',
            shi:'',
            zi:'',
            other_name:'',
            birth_time_id:'',
            birth_standard_name:'',
            death_time_id:'1',
            death_standard_name:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:'',
            english:'',
            location_id:'',
            location:'',
            father:{},
            mother:{},
            son:[],
            daughter:[],
            brother:[],
            sister:[],
            teacher:[],
            student:[],
            friend:[],
            father_standard_name:'',
            mother_standard_name:'',
            son_standard_name:[],
            daughter_standard_name:[],
            brother_standard_name:[],
            sister_standard_name:[],
            teacher_standard_name:[],
            student_standard_name:[],
            friend_standard_name:[],
        },

        create_one_selection:0,

        sort_item:{},
        sort_item_name:{},
        search_content: ''
    },
    getters,
    mutations,
    actions,
});
export default store