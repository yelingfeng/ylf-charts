import { xAxis as XAXIS } from '../config/commonConfig'
import { deepCopy } from '../util'
import _ from 'lodash'

const EMPTY_DATA = { category: [], xAxis: [], series: [] }

/**
 * 是否为业务空数据
 * isEmptyData
 * @param  {Array} data
 */
const isEmptyData = data => {
    if (data === null) return true
    if (data.length === 1 && data[0].name === '') return true
}

/**
 * 取分类数据集合
 * getCategoryCollection
 * @param chain lodash chain对象
 */
const getCategoryCollection = chain => {
    const CATEGORY_KEY = 'category'
    const groupData = chain
        .filter(it => {
            return (
                it[CATEGORY_KEY] !== '' &&
                it[CATEGORY_KEY] != null &&
                it[CATEGORY_KEY].toUpperCase() !== XAXIS
            )
        })
        .map(it => {
            return it[CATEGORY_KEY]
        })
        .uniq()
        .value()
    return groupData || []
}

/**
 * 获得图例对象集合
 * getLegendCollection
 * @param  {Array}  group
 * @return {Array}
 */
const getLegendCollection = group => {
    let legendData = group.map(g => {
        return {
            name: g
        }
    })
    return legendData
}

/**
 * 是否有约定的xAxis分类标识
 * hasConsensusxAxis
 * 【与后台约定，如果有xAxis  坐标轴data就取xAxis的集合】
 * @param   data
 * @return {Boolean}
 */
const hasConsensusxAxis = data => {
    let hasXAsix = false
    data.forEach(it => {
        if (it.category && it.category.toUpperCase() === XAXIS) {
            // 与后台约定，如果有xAxis  x轴data就取xAxis的集合
            hasXAsix = true
        }
    })
    return hasXAsix
}

/**
 * 是否有约定的xAxis分类标识 基础图表类
 * [hasConsensusxAxisBase ]  基础图表类 判断是否有xAxis字段
 * @param   data
 * @return {Boolean}
 */
const hasConsensusxAxisBase = data => {
    let hasXAsix = false
    data.forEach(it => {
        if (it['xAxis']) {
            // 与后台约定，如果有xAxis  x轴data就取xAxis的集合
            hasXAsix = true
        }
    })
    return hasXAsix
}

/**
 * 取xAxis分组名称
 * getxAxisName
 * @param  chain
 * @param  hasAxis 是否存在特殊分组
 * @return {Array}
 */
const getxAxisName = (chain, hasAxis) => {
    let tmpArr
    let xAxisArr = []
    if (hasAxis) {
        tmpArr = chain.filter(it => {
            return it.category.toUpperCase() === XAXIS
        })
    } else {
        tmpArr = chain
    }
    xAxisArr = tmpArr
        .map(n => {
            return n.name
        })
        .uniq()
        .value()
    return xAxisArr
}

/**
 * 当有xAxis的时候，处理数据的方法。
 * 获取xAxis 对应相同name下的value
 * 例如
 * =============================================================================
 * ======  已知
 * ======    data: [{category:A ,name:G1,value:10}]
 * ======    xAxis : G1(按groupName取data中的name)
 * ======    groupName: A
 * ======  逻辑
 * ======   匹配groupName等于A下 且name为xAxis(G1)的数据 对应的value(100) 并返回
 * =============================================================================
 * lookGroupValue
 * @param  {String} groupName  分组名称
 * @param  {String} xAxis     xAxis名称
 * @param  {Array} chains
 * @return {String}
 */
const lookGroupValue = (groupName, xAxis, chains) => {
    let val = chains
        .filter(it => {
            return (
                it.name === xAxis &&
                it.category != null &&
                it.category === groupName
            )
        })
        .map(data => {
            return data.value
        })
        .toString()
        .value()
    return val
}

/**
 * 构建series集合对象
 * createSeriesCollection
 * @param {Object}
 *  {
 *      group: 分类数据集合
 *      data: 原始数据集合
 *      xAxis: 坐标数据集合
 *      chain: lodash处理data的chain对象
 *      hasxAxis: 是否有xAxis约定
 *  }
 *
 */
const createSeriesCollection = ({
    group,
    data,
    xAxis,
    chain,
    hasxAxis,
    name
}) => {
    let seriesCollect = []
    group.forEach(g => {
        let seriesTemp = []
        if (hasxAxis) {
            seriesTemp = xAxis.map(axis => {
                let val = lookGroupValue(g, axis, chain)
                let obj = g
                data.forEach(item => {
                    if (item.category === g && item.name === axis) {
                        obj = item
                    }
                })
                return {
                    name: axis,
                    value: val === '' ? 0 : val,
                    dataObj: obj,
                    xAxis: true
                }
            })
        } else {
            seriesTemp = data.map(d => {
                if (d.category === g) {
                    return {
                        name: d.name,
                        value: d.value,
                        dataObj: d,
                        tooltip: {
                            formatter: d.info
                        },
                        group: 'group'
                    }
                }
            })
        }
        seriesCollect.push({
            type: name,
            name: g,
            data: seriesTemp.filter(it => {
                return it !== undefined
            })
        })
    })
    return seriesCollect
}

/**
 * 多分组构建 用于线图 柱图 地图等多分组类图表
 * getGroupSeriesObj
 * @param {Array} originData 原始数据集合
 * @param {Object} props 属性集合对象
 * @param {String} __chartName__ 图表标识
 * @return  {category,xAxis,series,data}
 */
export const getGroupSeriesObj = (originData, name) => {
    // 非空判断处理
    if (isEmptyData(originData)) {
        return EMPTY_DATA
    }
    // 拷贝一份原始数据
    const data = deepCopy(originData) || []

    // 判断是否存在xAxis共识
    const hasxAxis = hasConsensusxAxis(data)

    // 转换成lodash chains
    const chain = _.chain(data)
    // 取分类数据集合
    const group = getCategoryCollection(chain)

    // 取xAxis 轴分组集合
    const xAxis = getxAxisName(chain, hasxAxis)

    // 构建series对象集合
    const series = createSeriesCollection({
        group,
        data,
        xAxis,
        chain,
        hasxAxis,
        name
    })

    return {
        xAxis,
        series
    }
}

/**
 * 普通非分组类图表series构建方法
 * [ 2.0需求 也需要支持xAixs功能 ]
 * getNormalSeriesObj
 * @param  {Array} originData  原始数据
 * @param  {Object} props       属性对象
 * @param  {String} __chartName__ 图表表示 bar line map
 * @return
 */
export const getNormalSeriesObj = (originData, __chartName__) => {
    let category = []
    let datas = []
    let data = deepCopy(originData)
    let hasxAxis = hasConsensusxAxisBase(data)

    let xAxisArr = []
    if (hasxAxis) {
        data.forEach(d => {
            if (d['xAxis']) {
                xAxisArr.push(d.name)
            }
        })
        data = data.filter(d => {
            return d['xAxis'] === undefined
        })
    }

    function hasDataVal(xAxis, data) {
        let v = ''
        data.forEach(d => {
            if (d.name === xAxis) {
                v = d
            }
        })
        return v
    }
    let seriesObj = {
        type: __chartName__
    }
    if (Array.isArray(data)) {
        if (hasxAxis) {
            datas = xAxisArr.map(xAxis => {
                category.push(xAxis)
                let it = hasDataVal(xAxis, data)
                let obj = {
                    name: xAxis,
                    value: it !== '' ? it.value : 0,
                    dataObj: it !== '' ? it : '',
                    group: 'noGroup'
                }
                if (it.info !== undefined) obj.info = it.info
                return obj
            })
        } else {
            datas = data.map(item => {
                category.push(item.name || '')
                return {
                    name: item.name,
                    value: item.value || 0,
                    info: item.info,
                    dataObj: item,
                    group: 'noGroup'
                }
            })
        }
    }
    seriesObj.data = datas
    return {
        category,
        seriesObj
    }
}

export const getCategory = originData => {
    // 转换成lodash chains
    const chain = _.chain(originData)
    // 取分类数据集合
    const group = getCategoryCollection(chain)

    // 取图例集合 ["A","B"] => [{name :"A"},{name:"B"}]
    return getLegendCollection(group)
}
