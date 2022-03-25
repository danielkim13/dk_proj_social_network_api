const { User, Thought } = require("../models");

const userController = {
  // get all the users /api/users
  async getAllUsers(req, res) {
    try {
      const dbUser = await User.find({}).select("-__v");
      if (!dbUser) {
        res.status(400).json({ message: "Bad Request!" });
        return;
      }
      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create an user /api/users
  async createUser({ body }, res) {
    try {
      const dbUser = await User.create(body);
      if (!dbUser) {
        res.status(400).json({ message: "Bad Request!" });
        return;
      }
      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   get a single user by id /api/users/:id
  async getSingleUser({ params }, res) {
    try {
      const dbUser = await User.findOne({ _id: params.id }).select("-__v");
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //  update a single user by id
  async updateSingleUser({ params, body }, res) {
    try {
      const dbUser = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidator: true });
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   delete a single user by id
  async removeUser({ params }, res) {
    try {
      const dbUser = await User.findOneAndDelete({ _id: params.id });
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      } else {
        res.json(dbUser);
        return Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
