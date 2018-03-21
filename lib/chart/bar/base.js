/**
 * Created by zhao on 2017/12/18.
 */
import { Bar } from './index'
export class BaseBar extends Bar {
    constructor(op) {
        super(op)
        this.name = 'BaseBar'
    }
    render(data) {
        if(data){
            super.render(data)
            this.create()
        }
    }
    create() {
        let option = this.barInjection(this.singleChartSetting())
        this.build(option)
    }
}
