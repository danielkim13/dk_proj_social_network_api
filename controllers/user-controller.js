const { User } = require("../models");

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
};

module.exports = userController;
