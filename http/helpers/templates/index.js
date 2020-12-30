const player = async(data)=>{
    let obj = {}
    let goals = await data.goals
    obj.goals = goals[0]?goals[0].count:0
    return {...data.toObject(),...obj}
}

module.exports = {
    player
}
