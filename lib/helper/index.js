function typeOf(obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
/**
 * [deepCopy description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const deepCopy = data => {
    const t = typeOf(data)
    let o
    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }
    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

export const isNullOrUndef = value =>  {
    return value === null || typeof value === 'undefined';
};

export const isFunction = value => {
    return Object.prototype.toString.call(value) === '[object Function]';
};

export const isArray = value => {
    return Array.isArray ? Array.isArray : Object.prototype.toString.call(value) === '[object Array]'
}
