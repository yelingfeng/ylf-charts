import { Pie, RosePie} from '../../../lib/index'
import { PIE_TYPE as PieTypes } from '@/util/constant'
/**
 * [createPie description]
 * @param  {[type]} childType 三级类型
 * @param  {[type]} options   参数
 * @return {[type]}            [description]
 */
export const createPie = (childType, options) => {
    let { props, el, onClick } = options
    let obj = {
        el,
        sub: childType,
        props,
        onClick
    }
    let vm;
    switch (childType) {
        case PieTypes.BASE:
            vm = new Pie(obj)
            break
        case PieTypes.ROSE:
            vm = new RosePie(obj)
            break
        default:
            break
    }
    return vm
}
