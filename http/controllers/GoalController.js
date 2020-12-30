const { Goal } = require("../../database");

module.exports = {
  index: async (req, res) => {
    const goals = await Goal.aggregate([
      { $group: { _id: "$player", count: { $sum: "$count" } } },
    ]);
    
    let p = await Goal.populate(goals,{path:'player'})

    return res.json({ data: p });
  },
};
