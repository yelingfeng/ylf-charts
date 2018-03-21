<template>
  <div id="box">
        <NavBar></NavBar>
        <div class="content">
           <router-view></router-view>
        </div>
  </div>
</template>

<script>
import NavBar from './navBar'
export default {
    name: 'App',
    data() {
        return {
        }
    },
    components:{
        NavBar
    }
}
</script>

<style >
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
