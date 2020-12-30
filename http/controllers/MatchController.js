const { Match, Team } = require("../../database");
const { Goal } = require("../../database/models/goal");
module.exports = {
  index: async (req, res) => {
    const matches = await Match.find()
      .populate([
        {
          path: "team_a",
          populate: [
            { path: "players" },
            { path: "goals", populate: { path: "player" } },
          ],
        },
        {
          path: "team_b",
          populate: [
            { path: "players" },
            { path: "goals", populate: { path: "player" } },
          ],
        },
      ])
      .sort([["time", "desc"]]);
    return res.json({ data: matches });
  },
  create: async (req, res) => {
    console.log(req.body);
    const team_a_goals =
      req.body.team_a.goals.length > 0
        ? await Goal.collection.insertMany(req.body.team_a.goals)
        : [];
    const team_b_goals =
      req.body.team_b.goals.length > 0
        ? await Goal.collection.insertMany(req.body.team_b.goals)
        : [];

    const team_a = await Team.create({
      players: req.body.team_a.players,
      goals:
        req.body.team_a.goals.length > 0
          ? team_a_goals.ops.map((goal) => goal._id)
          : [],
    });
    const team_b = await Team.create({
      players: req.body.team_b.players,
      goals:
        req.body.team_b.goals.length > 0
          ? team_b_goals.ops.map((goal) => goal._id)
          : [],
    });

    const match = new Match({ team_a: team_a._id, team_b: team_b._id });
    match.save();
    return res.json({ data: match });
  },
  find: async (req, res) => {
    const match = await Match.findById(req.params.id).populate([
      {
        path: "team_a",
        populate: [
          { path: "players" },
          { path: "goals", populate: { path: "player" } },
        ],
      },
      {
        path: "team_b",
        populate: [
          { path: "players" },
          { path: "goals", populate: { path: "player" } },
        ],
      },
    ]);
    if (!match) {
      return res.status(404).json({ err: true, msg: "match not found" });
    }
    return res.json({ data: match });
  },
  delete: async (req, res) => {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ err: true, msg: "match not found" });
    }
    match.delete();
    return res.json({ err: false, msg: "match deleted" });
  },
  update: async (req, res) => {
    const { players } = req.body;
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ err: true, msg: "match not found" });
    }

    return res.json({ data: match });
  },
};
