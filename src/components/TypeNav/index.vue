<template>
    <div class="type-nav">
        <div @mouseleave="leaveShow" @mouseenter="enterShow" class="container" >
            <h2  class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">爱艺购超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <transition name="sort">
                <div class="sort" v-show="show">
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item " @mouseenter="changeIndex(index)" @mouseleave="currentIndex = -1"
                        :class="{ cur: currentIndex === index }" v-for="(c1, index) in categoryList.slice(0,16)"
                        :key="c1.categoryId">
                        <h3>
                            <a :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                c1.categoryName
                            }}</a>
                        </h3>
                        <!-- 二三级分类 -->
                        <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                            c2.categoryName
                                        }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{
                                                c3.categoryName
                                            }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from "lodash/throttle"
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    methods: {
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 20),
        goSearch(event) {
            //利用编程式导航以及事件委派实现路由跳转是最好的方法
            //为a标签添加自定义属性可以通过dataset拿到自定义属性从而定位a标签，
            let element = event.target;
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            if (categoryname) {
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                if (category1id) {
                    query.categoryId = category1id
                } else if (category2id) {
                    query.categoryId = category2id
                } else {
                    query.categoryId = category3id
                }
                //整理参数
                if(this.$route.params){
                    location.params = this.$route.params
                }
                location.query = query
                //跳转
                this.$router.push(location)
            }
        },
        enterShow() {
            if (this.$route.path != "/home") {
                this.show = true;
            }
        },
        //当鼠标离开的时候，让商品分类列表进行隐藏
        leaveShow() {
            this.currentIndex = -1;
            //判断如果是Search路由组件的时候才会执行
            if (this.$route.path != "/home") {
                this.show = false;
            }

        },

    },
    mounted() {
        if(this.$route.path!='/home'){
            this.show = false
        }
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    background-color: #ccc
                }
            }
        }
        .sort-enter{
            height:0px
        }
        .sort-enter-to{
            height:461px
        }
        .sort-enter-active{
            transition: all .5s linear;
            overflow: hidden;
        }
    }
}
</style>