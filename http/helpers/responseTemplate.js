


const templates = require('./templates')

const format = (type,data)=>{
    let result
    if(Array.isArray(data)){
        result = []
        data.forEach((d)=>{
            result.push(templates[type](d))
        })
    }else{
        result = templates[type](data)
    }

    return result

}

module.exports = format