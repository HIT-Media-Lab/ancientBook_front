<template>
    <!--顶端固定不变的导航条-->
    <div id="store" class="store" v-show="show_bar">
        <div class="head-bar">
            <router-link to="/bookstore" style="color: white">
                <button class="bookstore">古籍库 </button>
            </router-link>
            <router-link to="/noumenon" style="color: white; margin-left: 47px">
                <button class="noumenon-store">本体库</button>
            </router-link>
            <input placeholder=" 请输入关键字搜索" class="search-input" v-model="sort_box" v-on:keydown.enter="search1">
            <button class="search-btn" @click="search1">搜 索</button>
            <img src="../assets/img/picture-button/avatar.png" class="user-img all-link" @click="show_login">
            <button class="user-name" @click="show_login" v-model="user_name">{{user_name}}</button>
            <div class="down-box"  v-show="sort_box.length!=0">
                <ul>
                    <li class="sort-box1 all-link" :title="sort_box" @click="search1()">
                        搜古籍：{{sort_box}}
                    </li>
                    <li class="sort-box2 all-link" :title="sort_box" @click="search2()">
                        搜本体：{{sort_box}}
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <login_modal v-bind:show_modal.sync = show_m @fireclose = "shut_box" >
                <header class="dialog-header" slot="header">
                    <h3 class="dialog-title">登 录</h3>
                </header>
                <div class="dialog-body" slot="body">
                    <div class="input-ac-pwd">
                        <div class="input-ac">
                            <input type="text" placeholder="请输入您的账号" class="user-name-input" v-model="account" @blur="check()" id="username" v-bind:class="{ warnborder: Active1 }">
                        </div>
                        <div class="input-password">
                            <input type="password" placeholder="请输入您的密码" class="password-input" v-model="pwd" @blur="check()" id="pwd" v-bind:class="{ warnborder: Active2 }">
                        </div>
                        <div class="warning-login">
                            <span id="warning" v-model="warning">{{warning}}</span>
                        </div>
                    </div>
                    <div class="code">
                        <input type="text" placeholder="请输入验证码" class="verification-code-input" v-model="v">
                        <img src="" id="v_picture" class="code-img" >
                        <button class="cover-code" @click="coverCode()" >换一张</button>
                    </div>
                    <div class="auto">
                        <input type="checkbox" id="save_password"  class="save-password-checkbox">
                        <span class="save-password-word" >自动登录</span>
                    </div>
                    <button class="login-button" @click="login()" v-bind:disabled="disabled">登  录</button>
                </div>
            </login_modal>
        </div>
        <div id="load">
            <loading v-show="showloading"></loading>
        </div>
    </div>
</template>

<script type="text/javascript">
    import bus from '../lib/bus'
    import login_modal from  '../component/modal.vue'
    import store from '../store/index'
    import loading from  '../component/loading.vue'
    export default{
        components:{
            login_modal,
            loading
        },
        created() {
            if (this.$route.name == '403' || this.$route.name == '404'){
                this.show_bar = false;
            }else {
                this.show_bar = true;
            }
            bus.$on('toggleLoading', (show) =>{
                this.showloading = show;
            });
            bus.$on('change_name',(item) =>{
                this.user_name = item;
            });
            this.$store.commit('change_fork', true);
        },
        watch:{
            $route(){
                if (this.$route.name == '403' || this.$route.name == '404'){
                    this.show_bar = false;
                }else {
                    this.show_bar = true;
                }

                bus.$on('toggleLoading', (show) =>{
                    this.showloading = show;
                });
                bus.$on('change_name',(item) =>{
                    this.user_name = item;
                });
            }
        },
        destroyed(){
            localStorage.setItem('user',JSON.stringify("guest"));
            bus.$emit('change_name', '登录');
        },
        data(){
            return{
                user_name: '登录',
                sort_box:'',
                url: '/ancient_books/logout.action',
                show_m: false,
                showloading: false,
                login_url: '/ancient_books/login.action',
                code_url: '/ancient_books/get_v_picture.action',
                judge_code_url: '/ancient_books/get_v_picture.action',
                warning:'',
                account: '',
                pwd: '',
                v: '',
                Active1: false,
                Active2: false,
                disabled: false,
                auto: false,
                object: {},
                show:'',
                show_bar: true
            }
        },
        methods:{
            show_login(){
                let user_id = JSON.parse(localStorage.getItem('user'));
                if (user_id == 'guest'){
                    this.show_m = true;
                    this.create_v_picture();
                }else if(user_id == 'user'){
                    this.$router.push({path: '/user'});
                }else if(user_id == 'admin'){
                    this.$router.push({path: '/admin/page/1'});
                }
            },
            hide:function () {
                this.sort_box = ''
            },
            search1:function () {
                if (this.sort_box == ''){
                    this.$router.push("/login");
                } else if (this.sort_box != ''){
                    this.$route.params.content = this.sort_box;
                    this.$route.params.pageId = 1;
                    this.$router.push({name: 'search_book', params: this.$route.params});
                    this.sort_box = '';
                }
                if (this.sort_box != ''){

                }
            },
            search2: function () {
                this.$route.params.content = this.sort_box;
                this.$route.params.pageId = 1;
                if (this.sort_box != ''){
                    this.$router.push({name: 'search_noumenon', params: this.$route.params});
                    this.sort_box = '';
                }
            },
            /**
             *  账号 正则判断输入是否规范
             */

            check(){
                this.disabled = false;
                this.warning = "";
                this.Active1=false;
                this.Active2=false;
                let success1=this.check_user(this.account);
                let success2=this.check_pwd(this.pwd);
                if (success1 && success2){
                    this.warning= "";
                    this.Active1=false;
                    this.disabled=false;
                } else{
                    if (!success1) {
                        this.warning = "用户名格式错误";
                        this.Active1 = true;
                        this.disabled = true;
                    }else if(!success2){
                        this.warning =  "密码格式错误";
                        this.Active2=true;
                        this.disabled=true;
                    }
                }
            },
            coverCode(){
                document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime()
            },

            create_v_picture(){
                document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime();
            },

            //登录的回调函数
            login_success(response){
                if (response.body.su == 1) {
                    localStorage.setItem('user',JSON.stringify("admin"));
                    this.$route.params.pageId = 1;
                    this.$router.push({name: 'admin', params: this.$route.params});
                    console.log("登录成功后的全局Token"+this.$store.getters.GetToken);
                    this.name = response.body.name;
                    this.account = '';
                    this.pwd = '';
                    this.v = '';
                    this.show_m = false;
                    document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime();
                }
                if (response.body.su == 0) {
                    localStorage.setItem('user',JSON.stringify("user"));
                    this.$router.push({path: '/user'});
                    this.name = response.body.name;
                    this.account = '';
                    this.pwd = '';
                    this.v = '';
                    this.show_m = false;
                    document.getElementById("v_picture").src = this.code_url + '?' + (new Date()).getTime();
                }
            },
            //登陆失败函数
            login_fail(response){
                document.getElementById("v_picture").src = this.code_url + '?' + (new Date()).getTime();
                this.warning = "账号、密码或验证码有误"
            },
            //点击登录按钮执行函数
            login() {
                //给对象object内容赋值
                this.object.account=this.account;
                this.object.pwd=this.pwd;
                this.object.v=this.v;
                if(document.getElementById('save_password').checked==false){
                    this.auto = false;
                }else {
                    this.auto = true;
                }
                this.object.auto=this.auto;
                console.log("全局token"+this.$store.getters.GetToken);
                // 与后端对接的vue-resource
                this.http_json(this.login_url,'post',this.object,this.login_success,this.login_fail);
            },
            shut_box(){
                this.show_m = false;
                this.account = '';
                this.pwd = '';
                this.v = '';
                this.warning = "";
                this.Active1=false;
                this.Active2=false;
                document.getElementById("v_picture").src = this.code_url + '?' + (new Date()).getTime();

            }
        }
    }
</script>

<style>
    .store{
        margin-top: 25px;
        height: 70px;
        width: 100%;
    }
    .head-bar{
        margin: 0 auto;
        width: 990px;
    }
    .bookstore{
        background-image: url("../assets/img/button/ink-button.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;
    }
    .noumenon-store{
        /*margin-left: 47px;*/
        background-image: url("../assets/img/button/ink-button.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;

    }
    .search-btn{
        background-image: url("../assets/img/button/search-button-small.png");
        background-repeat: no-repeat;
        width: 100px;
        height: 50px;
        border: none;
        margin-left: -20px;
        color: white;
        background-color: transparent;
        /*display: inline-block;*/
    }
    .user-name{
        padding: 5px;
        width: auto;
        height: 40px;
        font-weight:700;
        font-style:normal;
        font-size:20px;
        color:#999999;
        text-align:center;
    }
    .user-img{
        margin-left: 30px;
        width: 50px;
        height: 50px;
    }
    .down-box{
        background-image: url("../assets/img/modal-box/search-drop-box.png");
        background-size:100%;
        padding: 2px;
        background-repeat: no-repeat;
        margin-left: 370px;
        margin-top: -8px;
        height: 50px;
        width: 290px;
    }
    .search-input{

        font-family: SuXinShiLiuKaiFan ;
        margin-left: 30px;
        vertical-align:middle;
        padding: 0 20px;
        background-image: url("../assets/img/modal-box/search-input-small.png");
        background-color: transparent;
        background-repeat: no-repeat;
        border: none;
        width: 280px;
        height: 49px;
    }
    .sort-box1{
        color: #0f0f0f;
        font-size: 14px;
        margin-left: 10px;
        list-style: none;
        width: 270px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .sort-box2{
        color: #0f0f0f;
        font-size: 14px;
        margin-left: 10px;
        list-style: none;
        width: 270px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }

    .warning-login{
        width: 300px;
        height: 30px;
        font-size:12px;
        color:red;
        margin-top: 10px;
    }
    .input-ac-pwd{
        width: 320px;
        margin-left: 10px;
        display: inline-block;
    }
    .input-ac{
        margin-bottom: 10px;
        width: 320px;
    }
    .input-password{
        margin-top: 20px;
        width: 320px;
    }

    .user-name-input{
        /*margin-left: 20px;*/
        font-size: 20px;
        padding: 15px;
        width: 320px;
        height: 45px;
        border: 1.5px solid grey;
        /*border-color: #0f0f0f;*/

    }
    .password-input{
        /*margin-left: 20px;*/
        font-size: 20px;
        padding: 15px;
        height: 45px;
        border: 1.5px solid grey;
        width: 320px;
    }
    .code{
        margin-top: -5px;
        margin-left: 10px;

    }
    .verification-code-input{
        border: 1.5px solid grey;
        font-size: 20px;
        height: 45px;
        width: 160px;
        text-align: center;
        vertical-align: text-bottom;
    }
    .code-img{
        margin-left: 10px;
        width: 76px;
        height: 45px;
        border: none;
        vertical-align: text-bottom;
    }
    .cover-code{
        margin-left: 10px;
    }
    .auto{
        margin-left: 10px;
        margin-top: 10px;
    }
    .save-password-checkbox{
        vertical-align: text-bottom;
        width: 20px;
        height: 20px;
    }
    .save-password-word{
        font-size: 15px;
        color: grey;
    }

    .login-button{
        margin-top: 8px;
        margin-left: 10px;
        width: 320px;
        height: 45px;
        color: white;
        background-image: url("../assets/img/button/login-button.png");
        background-repeat: no-repeat;
        background-size: 100%;
        border: none;
    }
    .dialog-header {
        background-image: url("../assets/img/no-use-picture/modal-header.png");
        background-size:100%;
    }

    .dialog-title {
        color: white;
        font-size: 30px;
        text-align: center;
        width:6em;
        margin-left: 110px;
        font-weight: 200;
        line-height: 1em;
        display: inline-block;
    }

    .dialog-body {
        padding: 1.5em;
    }
    /*错误提示红框*/
    .warnborder {
        border: 2px solid red;
    }
</style>