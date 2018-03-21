<template lang="html">
      <div class="box">
          <el-row>
            <el-col :span="12">
                <h2>基础柱图</h2>
                <chart ref="c" :options="opts"></chart>
            </el-col>
            <el-col :span="12">
                <h2>分组柱图</h2>
                <chart ref="c2" :options="opts2"></chart>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="24">
                  <h2>排名柱图</h2>
                  <chart ref="c3" :options="opts3"></chart>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="24">
                  <h2>柱形折线图</h2>
                  <chart ref="c4" :options="opts4"></chart>
              </el-col>
          </el-row>
      </div>
</template>

<script>
import chart from '@/common/chart.vue'
import { normal, normalGroup, names, categorys } from '@/util/mockUtil'
import { initBarOption } from '@/util/op'
export default {
    name: 'Bar',
    data() {
        const ops = initBarOption()
        return {
            opts: ops[0],
            opts2:ops[1],
            opts3:ops[2],
            opts4:ops[3]
        }
    },
    mounted() {
        const base = normal().result
        const groupData = normalGroup(40).result
        const levelData =  normal(10, [{
            'ordernum|+1': 1,
            'name|+1': ['其他HTTP应用', '传统互联网应用', '下载工具', '网络游戏', '通用协议', '视频', '文件传输', '移动互联网VoIP业务', '即时通信', '终端控制'],
            'value|+1': 1
        }]).result
        const multiData = normal(40, [{
            'name|+1': names,
            'value|10-100': 10,
            'category|+1': categorys,
            'type|1': ['bar', 'line'],
            info: '@ctitle(10)'
        }]).result
        setTimeout(() => {
            this.$refs.c.loadData(base)
            this.$refs.c2.loadData(groupData)
            this.$refs.c3.loadData(levelData)
            this.$refs.c4.loadData(multiData)
        }, 10)
    },
    components: {
        chart
    }
}
</script>

<style lang="css">
</style>
