const router = require("express").Router();
const { getAllUsers, createUser, getSingleUser, updateSingleUser, removeUser } = require("../../controllers/user-controller");

// GET all users and create new user
router.route("/").get(getAllUsers).post(createUser);

// Get single user by id, update user by id, and delete user by id.
router.route("/:id").get(getSingleUser).put(updateSingleUser).delete(removeUser);

module.exports = router;
