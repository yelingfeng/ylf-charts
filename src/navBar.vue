<template lang="html">
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect">
    <el-menu-item index="/bar">Bar</el-menu-item>
    <!-- <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu> -->
    <el-menu-item index="/line" >line</el-menu-item>
    <el-menu-item index="/pie">pie</el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name: 'navBar',
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    methods: {
        handleSelect() {

        }
    }
}
</script>

<style lang="css">
</style>
