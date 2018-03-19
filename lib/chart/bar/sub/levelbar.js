/**
 * Created by zhao on 2017/12/18.
 */
import { Bar } from './index'
export class LevelBar extends Bar {
    constructor(op) {
        super(op)
        this.name = 'LevelBar'
    }
    render(data) {
        if(data){
            super.render(data)
            this.create()
        }
    }
    create() {
        let option = this.barInjection(this.singleChartSetting())
        this.build(this.orderNumSort(option))
    }
    orderNumSort(option) {
        let data = option.series[0].data
        let y = option.yAxis[0].data
        let result = []
        data.forEach(item => {
            let i = item.dataObj.ordernum
            result[i - 1] = item
        })
        // 判断是否已经为横向
        if (y) {
            option.series[0].data = result.reverse()
            option.yAxis[0].data = y.reverse()
        }
        return option
    }
}
