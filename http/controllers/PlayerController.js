const { Promise } = require("mongoose");
const { Player } = require("../../database");
const format = require("../helpers/responseTemplate");
require("express-async-errors");

module.exports = {
  index: async (req, res) => {
    const players = await Player.find();
    Promise.all(format("player", players)).then((result) => {
      return res.json({
        data: result.sort((a, b) => (a.goals > b.goals ? -1 : 1)),
      });
    });
  },
  create: async (req, res) => {
    const { name } = req.body;
    const player = new Player({ name });
    await player.save();
    format("player", player).then((formattedPlayer) => {
      return res.json({ data: formattedPlayer });
    });
  },
  find: async (req, res) => {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ err: true, msg: "player not found" });
    }
    let da = await player.goals;
    console.log(da[0]);
    player.a = 0;
    return res.json({ data: await format("player", player) });
  },
  delete: async (req, res) => {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ err: true, msg: "player not found" });
    }
    player.delete();
    return res.json({ err: false, msg: "player deleted" });
  },
  update: async (req, res) => {
    const { name } = req.body;
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!player) {
      return res.status(404).json({ err: true, msg: "player not found" });
    }

    format("player", player).then((formattedPlayer) => {
      return res.json({ data: formattedPlayer });
    });
  },
};
