<template>
    <div>
        <!-- 三级联动全局组件，因为已经全局注册，所以这里不要需要引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(item) in floorList" :key="item.id" :list="item"/>
        <Brand/>
    </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Brand from '@/pages/Home/Brand'
import Rank from '@/pages/Home/Rank'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import Recommend from '@/pages/Home/Recommend'
import { mapState } from 'vuex'
export default {
    name:'',
    components:{
        ListContainer,
        Brand,
        Rank,
        Floor,
        Like,
        Recommend
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    },
    methods:{
    },
    mounted(){
        this.$store.dispatch('getFloorList');
        this.$store.dispatch('getUserInfo');
    }



}
</script>

<style>

</style>