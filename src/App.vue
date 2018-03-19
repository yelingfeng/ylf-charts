<template>
  <div id="box">
    <h2>基础柱图</h2>
    <chart ref="c" :options="opts"></chart>
  </div>
</template>

<script>
import chart from './common/chart.vue'
import { normal } from './common/mockUtil'
export default {
    name: 'App',
    data() {
        return {
            opts: {
                width: 600,
                height: 400,
                chartType: 'Bar',
                childType: 'base',
                props: {
                    specialProp:{
                        bar: {
                            width: '10',
                            // 圆角barBorderRadius Number
                            barBorderRadius: 5,
                            hoverColor: '#00ccff'
                        }
                    }
                },
                onClickHandler() {},
                renderData:[
                    {name : '星期一', value:'10'},
                    {name : '星期二', value:'30'},
                    {name : '星期三', value:'40'},
                    {name : '星期四', value:'60'},
                    {name : '星期五', value:'22'}
                ]
            }
        }
    },
    mounted() {
        const datas = normal().result
        console.log(datas)
        setTimeout(() => {
            this.$refs.c.loadData(datas)
        }, 2000)
    },
    components: {
        chart
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
