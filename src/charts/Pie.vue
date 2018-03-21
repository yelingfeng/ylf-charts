<template lang="html">
      <div class="box">
          <el-row>
            <el-col :span="12">
                <h2>饼图</h2>
                <chart ref="c" :options="opts"></chart>
            </el-col>
            <el-col :span="12">
                <h2>玫瑰图</h2>
                <chart ref="c2" :options="opts2"></chart>
            </el-col>
          </el-row>
      </div>
</template>

<script>
import chart from '@/common/chart.vue'
import { normal } from '@/util/mockUtil'
import { initPieOption } from '@/util/op'
export default {
    name: 'Pie',
    data() {
        const ops = initPieOption()
        return {
            opts: ops[0],
            opts2:ops[1]
        }
    },
    mounted() {
        const base = normal(6).result
        const rose = normal(6).result
        setTimeout(() => {
            this.$refs.c.loadData(base)
            this.$refs.c2.loadData(rose)
        }, 10)
    },
    components: {
        chart
    }
}
</script>

<style lang="css">
</style>
