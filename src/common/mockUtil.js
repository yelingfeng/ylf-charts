import Mock from 'mockjs'
const names = ['苹果', '香蕉', '梨', '橙子', '樱桃', '西柚', '泥猴桃', '草莓']
const info = '@ctitle(10)'
const categorys = ['A', 'B', 'C']

const format = date => {
    let dateString = new Date(date)
    let month =
        dateString.getMonth() + 1 < 10 ?
            '0' + (dateString.getMonth() + 1) :
            dateString.getMonth() + 1
    let day =
        dateString.getDate() < 10 ?
            '0' + dateString.getDate() :
            dateString.getDate()
    return dateString.getFullYear() + '-' + month + '-' + day
}

const rangeDate = (min, max) => {
    let days = (new Date(max) - new Date(min)) / 1000 / 60 / 60 / 24
    let i = 0
    let len = Math.floor(days)
    let dates = []
    for (; i <= len; i++) {
        dates.push(format(new Date(min).getTime() + 1000 * 60 * 60 * 24 * i))
    }
    return dates
}

const base = [
    {
        'name|+1': names,
        'value|10-100': 10,
        info
    }
]

const group = [
    {
        'name|+1': names,
        'value|10-100': 10,
        'category|+1': categorys,
        info
    }
]
const lineGroup = [
    {
        'name|+1': rangeDate('2017-01-01', '2017-03-01'),
        'value|10-100': 10,
        'category|+1': categorys,
        info
    }
]

const resultHandler = (page, tmpl) => {
    return {
        [`result|${page}`]: tmpl
    }
}
/**
 * [execute 执行模板方法 ]
 * @param  {Number}  page 生成记录数
 * @param  {Object} [tmpl={}] 模板
 * @return
 */
function execute(page, tmpl = {}) {
    return Mock.mock(resultHandler(page, tmpl))
}

/**
 * [normal 基础]
 * @param  {Number} [page=10]   生成记录数
 * @param  {Array} [tmpl=base] mock模板对象
 * @return
 */
export function normal(page = 10, tmpl = base) {
    return execute(page, tmpl)
}

/**
 * [normalGroup 基础分组]
 * @param  {Number} [page=10]   生成记录数
 * @param  {Array} [tmpl=base] mock模板对象
 * @return
 */
export function normalGroup(page = 20, tmpl = group) {
    return execute(page, tmpl)
}

/**
 * [normalLineGroup 线图基础分组]
 * @param  {Number} [page=30]        [description]
 * @param  {[type]} [tmpl=lineGroup] [description]
 * @return {[type]}                  [description]
 */
export function normalLineGroup(page = 30, tmpl = lineGroup) {
    return execute(page, tmpl)
}
