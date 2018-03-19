/**
 * Created by zhao on 2017/12/18.
 */
import { Bar } from './index'
export class GroupBar extends Bar {
    constructor(op) {
        super(op)
        this.name = 'GroupBar'
    }
    render(data) {
        super.render(data)
        this.create()
    }
    create() {
        let option = this.barInjection(this.groupChartSetting())
        this.build(option)
    }
}
