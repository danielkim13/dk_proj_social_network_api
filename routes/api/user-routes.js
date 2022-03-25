const router = require("express").Router();
const { getAllUsers, createUser } = require("../../controllers/user-controller");

// GET all users and create new user
router.route("/").get(getAllUsers).post(createUser);

// Get single user by id, update user by id, and delete user by id.
router.route("/:id").get().put().delete();

module.exports = router;
