import { Bar, GroupBar, LevelBar, MultiBar} from '../../lib/index'
import { BAR_TYPE as BarTypes } from './constant'
/**
 * [createBar description]
 * @param  {[type]} childType 三级类型
 * @param  {[type]} options   参数
 * @return {[type]}            [description]
 */
export const createBar = (childType, options) => {
    let { props, el, onClick } = options
    let obj = {
        el,
        sub: childType,
        props,
        onClick
    }
    let vm
    // debugger
    switch (childType) {
        case BarTypes.BASE:
            vm = new Bar(obj)
            break
        case BarTypes.GROUP:
            vm = new GroupBar(obj)
            break
        case BarTypes.LEVEL:
            vm = new LevelBar(obj)
            break
        case BarTypes.MULTI_AXIS:
            vm = new MultiBar(obj)
            break
        default:
            break
    }
    return vm
}
