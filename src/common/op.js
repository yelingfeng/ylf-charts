import _ from 'lodash'
let BAR_OP = [
    {
        width: 500,
        height: 400,
        chartType: 'Bar',
        childType: 'base'
    },
    {
        width: 500,
        height: 400,
        chartType: 'Bar',
        childType: 'group'
    },
    {
        width: 1000,
        height: 400,
        chartType: 'Bar',
        childType: 'level'
    },
    {
        width: 1000,
        height: 400,
        chartType: 'Bar',
        childType: 'multiAxis'
    }
]
export const initBarOption = () => {
    let obj = {
        props: {
            specialProp:{
                bar: {
                    width: '10',
                    barBorderRadius: 5,
                    hoverColor: '#00ccff',
                    isStack : '1'
                }
            }
        }
    }
    let result = []
    BAR_OP.forEach(it => {
        let _tmp = _.cloneDeep(Object.assign({}, obj, it))
        if(_tmp.childType === 'level') _tmp.props.specialProp.bar.isTransverse = '1'
        result.push(_tmp)
    })
    return result
}
