<template lang="html">
      <div class="box">
          <el-row>
            <el-col :span="25">
                <h2>基础折线</h2>
                <chart ref="c" :options="opts"></chart>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="24">
                  <h2>分组折线</h2>
                  <chart ref="c2" :options="opts2"></chart>
              </el-col>
          </el-row>
      </div>
</template>

<script>
import chart from '@/common/chart.vue'
import { normal, normalLineGroup, rangeDate } from '@/util/mockUtil'
import { initLineOption } from '@/util/op'
export default {
    name: 'Line',
    data() {
        const ops = initLineOption()
        return {
            opts: ops[0],
            opts2:ops[1]
        }
    },
    mounted() {
        const base = normal(50, [
            {
                'name|+1': rangeDate('2017-10-01', '2017-10-30'),
                'value|10-200': 1,
                category: 'A'
            }
        ]).result
        const group = normalLineGroup(200).result
        setTimeout(() => {
            this.$refs.c.loadData(base)
            this.$refs.c2.loadData(group)
        }, 10)
    },
    components: {
        chart
    }
}
</script>

<style lang="css">
</style>
