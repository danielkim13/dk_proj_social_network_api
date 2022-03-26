const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThought = await Thought.find({}).populate({ path: "reactions", select: "-__v" }).select("-__v");
      if (!dbThought) return res.status(400).json({ message: "Bad Request!" });
      res.json(dbThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   create a thought need to ask how to create async with this case.
  async createThought({ body }, res) {
    try {
      const dbThought = await Thought.create(body);
      const dbUser = await User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThought.id } }, { new: true });
      res.json({ dbThought, dbUser, message: "A thought was successfully created" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   get single thought by id /api/thoughts/:id.
  async getSingleThought({ params }, res) {
    try {
      const dbThought = await Thought.findOne({ _id: params.id }).populate({ path: "reactions", select: "-__v" }).select("-__v");
      if (!dbThought) return res.status(404).json({ message: "No thought found with this id" });
      res.json(dbThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   update a single thought by id.
  async updateSingleThought({ params, body }, res) {
    try {
      const dbThought = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidator: true });
      if (!dbThought) return res.status(404).json({ message: "No thought found with this id" });
      console.log(dbThought);
      res.json({ dbThought, message: "The thought has been updated successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   delete a single thought by id.
  async removeThought({ params }, res) {
    try {
      const dbThought = await Thought.findOneAndDelete({ _id: params.id });
      if (!dbThought) return res.status(404).json({ message: "No thought found with this id!" });
      res.json({ dbThought, message: "The thought has been deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   create a reaction stored in a single thought's reactions array field. /api/thoughts/:thoughtId/reactions
  async addReaction({ params, body }, res) {
    try {
      const dbReaction = await Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidator: true });
      if (!dbReaction) return res.status(404).json({ message: "No thought found with this id" });
      res.json({ dbReaction, message: "A reaction was created successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a reaction by the reaction's reactionId value.
};

module.exports = thoughtController;
