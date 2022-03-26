const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThought = await Thought.find({}).select("-__v");
      if (!dbThought) {
        res.status(400).json({ message: "Bad Request!" });
        return;
      }
      res.json(dbThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   create a thought need to ask how to create async with this case.
  async createThought({ body }, res) {
    try {
      console.log(body);
      const dbThought = await Thought.create(body).then(({ _id }) => {
        return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
      });
      if (!dbThought) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(dbThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


};

module.exports = thoughtController;
