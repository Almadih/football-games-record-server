const { Team, Player } = require("../../database");
module.exports = {
  index: async (req, res) => {
    const teams = await Team.find().populate([
      { path: "players" },
      { path: "goals", populate: { path: "player" } },
    ]);

    return res.json({ data: teams });
  },
  create: async (req, res) => {
    const { players } = req.body;
    const team = new Team({ players });
    await team.save();
    return res.json({ data: team });
  },
  find: async (req, res) => {
    const team = await Team.findById(req.params.id).populate([
      { path: "players" },
      { path: "goals", populate: { path: "player" } },
    ]);
    if (!team) {
      return res.status(404).json({ err: true, msg: "team not found" });
    }
    return res.json({ data: team });
  },
  delete: async (req, res) => {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ err: true, msg: "team not found" });
    }
    team.delete();
    return res.json({ err: false, msg: "team deleted" });
  },
  update: async (req, res) => {
    const { players } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ err: true, msg: "team not found" });
    }

    return res.json({ data: team });
  },
};
