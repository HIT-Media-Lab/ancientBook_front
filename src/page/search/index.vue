<!--搜索结果总页面-->
<template>
    <div class="j-search-all">
        <ul class="nav nav-tabs">
            <li id="j-book-button" class="active" @click="remove_noumenon_link">
                <a data-toggle="tab" v-model="search_number_book">
                    古籍库({{search_number_book}})
                </a>
            </li>
            <li id="j-noumenon-button" @click="remove_book_link">
                <a data-toggle="tab" v-model="search_number_noumenon">
                    本体库({{(search_number_noumenon)}})
                </a>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        beforeRouteUpdate (to, from, next) {
            if (to.name == "search_book"){
                this.remove_noumenon();
                next();
            }else if(to.name == "search_noumenon") {
                this.remove_book();
                next();
            }else {
                next();
            }
        },
        data() {
            return{
                search_content: '',
                search_url: '/ancient_books/get_ancient_books_list_by_name.action',
                content_url: '/ancient_books/get_all_noumenon_searched.action',
                search_number_book: 0,
                search_number_noumenon: 0
            }
        },
        created(){
            this.search_content = '';
            this.search_number_book = 0;
            this.search_number_noumenon = 0;
            this.search_content = this.$route.params.content;
            let url = this.search_url + '?name=' + this.search_content + '&&page_count=' + this.$route.params.pageId;
            this.http_json( url, 'get', url, this.success1, this.fail1);
            let item = this.content_url + '?name=' + this.$route.params.content;
            this.http_json(item, 'get', item, this.success_noumenon, this.fail);
        },
        watch:{
            $route(){
                this.search_content = '';
                this.search_number_book = 0;
                this.search_number_noumenon = 0;
                this.search_content = this.$route.params.content;
                let url = this.search_url + '?name=' + this.search_content + '&&page_count=' + this.$route.params.pageId;
                this.http_json( url, 'get', url, this.success1, this.fail1);
                let item = this.content_url + '?name=' + this.$route.params.content;
                this.http_json(item, 'get', item, this.success_noumenon, this.fail);
            }
        },
        mounted() {
          this.change_button()
        },
        methods : {
            success1(response){
                this.search_number_book = response.body.total_number;
            },
            success_noumenon(response){
                this.search_number_noumenon = response.body.content.length;
            },
            /**
             * 按钮效果逻辑，以及路由跳转
             */
            remove_book() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "";
                noumenon_button.className = "active";
            },
            remove_book_link() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "";
                noumenon_button.className = "active";
                this.$route.params.pageId = 1;
                this.$router.push({name: 'search_noumenon', params: this.$route.params})
            },
            remove_noumenon() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "active";
                noumenon_button.className = "";
            },
            remove_noumenon_link() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "active";
                noumenon_button.className = "";
                this.$route.params.pageId = 1;
                this.$router.push({name: 'search_book', params: this.$route.params})
            },
            change_button(){
                if(this.$route.name == "search_book"){
                    this.remove_noumenon()
                }else if(this.$route.name == "search_noumenon"){
                    this.remove_book()
                }
            }
        }
    }
</script>

<style>
    .j-search-all{
        margin: 50px auto;
        width: 1000px;
        height: 500px;
    }
    .j-search-button{
        padding: 10px;
        border: 1px solid black;
        border-bottom-color: transparent ;
    }
</style>