<!--已上传古籍页面-->
<template>
    <div class="all">
        <recent_title class="j-alup-bar" :title="this.title"></recent_title>
        <div class="j-alup">
            <p class="j-none-book" v-show="none_book" v-model="none_book">无 任 何 古 籍 上 传 记 录</p>
            <div class="j-alupload-div" v-for="(item,index) in content" :id = "index">
                <div  v-on:mouseover="show_edit1(index)" v-on:mouseout="shut_edit1(index)">
                    <!--封面悬浮出现的两个图标-->
                    <div class="show-edit1">
                        <img class="j-pen all-link" src="../../../../assets/img/picture-button/white-pen.png" @click="go_to_edit_books(item.ancient_book_id)">
                        <img class="all-link" src="../../../../assets/img/picture-button/white-cross.png" @click="delete_book(item.ancient_book_id)">
                    </div>
                    <img :id="item.ancient_book_id" class="j-alupload-img all-link" @click="go_to_bookinfo(item.ancient_book_id)">
                </div>
                <p class="j-alupload-p all-link" @click="go_to_bookinfo(item.ancient_book_id)" :title="item.name">{{item.name}}</p>
            </div>
        </div>
        <!--翻页组件-->
        <page_button :max=this.total_page></page_button>
    </div>
</template>

<script>
    import recent_title from '../../../../component/noumenon-title.vue'
    import page_button from '../../../../component/paginator.vue'
    export default{
        components:{
            recent_title,
            page_button
        },
        /**
         * 获取古籍列表
         */
        created(){
            this.i = 0;
            this.content = [];
            let url = this.alupload_url + '?page_count=' + this.$route.params.pageId;
            this.http_json(url, 'get', url, this.alup_success, this.alup_fail);
        },
        watch:{
            $route(){
                this.content = [];
                this. i = 0;
                let url = this.alupload_url + '?page_count=' + this.$route.params.pageId;
                this.http_json(url, 'get', url, this.alup_success, this.alup_fail);
            }
        },
        data(){
            return{
                alupload_url:'/ancient_books/get_ancient_book_list_by_user_upload.action',
                picture_page_url: "/ancient_books/get_page_id_by_jcy.action",
                picture_url: '/ancient_books/get_picture_by_id.action',
                delete_url: '/ancient_books/delete_ancient_book.action',
                title: '已上传古籍',
                total_page: 1,
                i: 0,
                content: [],
                params:{},
                none_book: true
            }
        },
        methods:{
            /**
             *前往古籍详情页面
             */
            go_to_bookinfo(id){
                this.$route.params.ancient_book_id = id;
                this.$router.push({name: 'book_info', params: this.$route.params});
            },
            /**
             *控制封面图标的显隐
             */
            show_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0.9;
            },
            shut_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0;
            },
            alup_success(response){
                if (response.body.content.length == 0){
                    this.none_book = true;
                }else {
                    this.none_book = false;
                    this.total_page = response.body.total_page;
                    this.content = response.body.content;
                    for (let i = 0; i < response.body.content.length; i++){
                        let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.content[i].ancient_book_id;
                        this.http_json(item, 'get', item, this.up_page_success, this.alup_fail);
                    }
                }
            },
            /**
             *根据id附上图片
             */
            up_page_success(response){
                let picture_id_url1 = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.content[this.i].ancient_book_id).setAttribute("src", picture_id_url1);
                this.i = this.i + 1;

            },
            alup_fail(){

            },
            /**
             * 编辑古籍
             */
            go_to_edit_books(id){
                this.$route.params.ancient_book_id = id;
                this.$router.push({name: 'modify1', params: this.$route.params})
            },
            /**
             *删除古籍
             */
            delete_book(id){
                this.params.id = id;
                this.http_json(this.delete_url, 'post', this.params, this.delete_book_success, this.delete_book_fail)
            },
            delete_book_success(response){
                window.location.reload();
            },
            delete_book_fail(response){
            }
        }
    }
</script>

<style>
    .j-alup-bar{
        margin: -65px auto
    }
    .j-alup{
        margin: 100px auto;
        width: 900px ;
        height: 760px ;
    }
    .j-alupload-div{
        float: left;
        margin-left: 70px;
        width: 120px;
        height: auto;
    }
    .j-alupload-img{
        width: 120px;
        height: 170px;
    }
    .j-alupload-p{
        height: 20px;
        margin-top: 3px;
        margin-bottom: 15px;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .j-none-book{
        margin: 240px auto;
        width: 600px;
        font-size: 45px;
    }
</style>