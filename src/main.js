"use strict";

import Vue from 'vue'
import App from './App.vue'
import  Vuex from  'vuex'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import './assets/less/index.less'
import store from './store'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.prototype.isLogin=false;
//定义的全局变量
Vue.prototype.Token='';
Vue.prototype.response={};


//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpPostJson=function (url,object,success,fail) {
    // this.BeforeHttp(object);
    this.$http.post(url, object,).then(function (response) {
        // console.log("可以知晓")
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
        // console.log("success之后");
        this.AfterSuccess();
        // console.log(JSON.stringify(response.body))
    },function () {
        fail()
    })
};

//定义的post的vue-router全局函数，以form-data形式传递数据
Vue.prototype.HttpPostForm=function (url,object,success,fail) {
    // this.BeforeHttp(object);
    this.$http.post(url, object,{
        emulateJSON: true
    }).then(function (response) {
        // console.log("可以知晓")
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
        // console.log("success之后");
        this.AfterSuccess();
        console.log(JSON.stringify(response.body))
    },function () {
        fail()
    })
};

//定义的get的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpGet=function (url,object,success,fail) {
    this.$http.get(url, object).then(function (response) {
        this.BeforeSuccess();
        success(response);
        this.AfterSuccess()

    },function () {
        fail()
    })
};

Vue.prototype.HttpGetForm=function (url,object,success,fail) {
    this.$http.get(url, object,{
        emulateJSON: true
    }).then(function (response) {
        this.BeforeSuccess();
        success(response);
        this.AfterSuccess()

    },function () {
        fail()
    })
};

// Vue.prototype.BeforeHttp=function (object) {
//     "use strict";
//     object.token = this.Token;
//     console.log("得到token成功");
//     return object.token
//
// };

//回调success前的函数
Vue.prototype.BeforeSuccess=function () {


};

//回调success后的函数
Vue.prototype.AfterSuccess=function () {
//更新token
    this.$http.get('/ancient_books/getToken.action').then(function (response) {
        this.Token=response.token;
        console.log("更新token成功");
        return this.Token
    })
};



// 定义组件, 也可以像教程之前教的方法从别的文件引入
import bookstore from './component/bookstore/index.vue'
import  noumenon_store from  './component/noumenom_store/index.vue'
import  user from  './component/user/index.vue'
import  login from  './login.vue'
import  super_user from  './super_user.vue'
import  upload_step1 from  './component/user/upload/firststep/index.vue'
import mybook_index from  './component/user/mybook/index.vue'
import  alupload_index from  './component/user/mybook/alupload/index.vue'
import  private_books_index from './component/user/mybook/private_books/index.vue'
import  my_collection_index from  './component/user/mycollection/index.vue'
import my_offer_index from  './component/user/myoffer/noumenon_edit/index.vue'
import noumenon_mark from  './component/user/myoffer/noumenon_mark/index.vue'
import  comment from  './component/user/myoffer/comment/index.vue'
import  revise from  './component/user/myoffer/revise/index.vue'
import  search_index from  './component/search/index.vue'
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'/login',
            component:login
        },
        {
            path:'/super_user',
            component:super_user
        },
        {
            path:'/noumenon_store',
            component:noumenon_store
        },
        {
            path:'/bookstore',
            component:bookstore
        },
        {
            path:'/user',
            component:user
        },
        {
            path:'/upload_step1',
            component:upload_step1
        },
        {
            path:'/mybook_index',
            component:mybook_index,
            name:mybook_index
        },
        {
            path:'/alupload_index',
            component:alupload_index
        },
        {
            path:'/private_books_index',
            component:private_books_index
        },
        {
            path:'/my_collection_index',
            component:my_collection_index
        },
        {
            path:'/my_offer_index',
            component:my_offer_index
        },
        {
            path:'/noumenon_mark',
            component:noumenon_mark
        },
        {
            path:'/comment',
            component:comment
        },
        {
            path:'/revise',
            component:revise
        },
        {
            path:'/search_index',
            component:search_index
        },
        {
            path: '/',
            redirect: '/login'  //默认路由
        },
        {
            path: '*',
            redirect: '/login' // 输入其他不存在的地址自动跳回首页
        }

    ]
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');

router.beforeEach(function(to, from, next){
    // 模拟登陆状态
    if (!this.isLogin) {
        next({path: '/login'});
    }else {
        next();
    }
});