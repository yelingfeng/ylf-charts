<template >
    <div ref='chart' :style="chartStyle"></div>
</template>

<script>
import _ from 'lodash'
import { initChart } from './loadChart'
export default {
    name: 'chart',
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            width: 400,
            height: 400
        }
    },
    created() {
        this.width = this.options.width
        this.height = this.options.height
    },
    mounted() {
        let chartType = this.options.chartType
        let childType = this.options.childType
        let props = _.clone(this.options.props)
        let el = this.$refs.chart
        let onClick = this.onClickHandler
        let options = {
            props,
            el,
            onClick
        }
        this.$compChart = initChart(chartType, childType, options)
        this.$compChart.render(this.options.renderData)
    },
    computed: {
        chartStyle() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    methods: {
        loadData(data) {
            if (data && this.$compChart !== undefined) {
                this.$compChart.render(data)
            }
        },
        syncProps(props) {
            if (props) {
                this.$compChart.updateProp(props)
            }
        },
        update(props) {
            if (props) {
                this.$compChart.updateProp(props)
            }
        },
        // 销毁方法
        beforeDestory() {
            if (this.$compChart) this.$compChart.dispose()
        },
        resizeComp(newVal) {
            if (newVal) {
                this.width = newVal.width
                this.height = newVal.height
                this.$nextTick(() => {
                    this.$compChart.resize()
                })
            }
        },
        // 图例类click统一处理
        onClickHandler(param) {
            // 处理treeMap图 点击面包屑 不触发级联
            if (param && param.selfType && param.selfType === 'breadcrumb')
                return

            // 处理地图空值点空白 时候
            if (param.seriesType === 'map' && isNaN(param.value)) return

            let { data } = param

            let payload = {
                type: '1',
                sourceData: data.dataObj,
                data: _.omit(data, ['dataObj'])
            }
            // console.log(payload)
            this.$emit('clickHandler', payload)
        }
    }
}
</script>

<style lang="css">
</style>
