const router = require("express").Router();
const { getAllUsers, createUser, getSingleUser, updateSingleUser, removeUser, addFriend, removeFriend } = require("../../controllers/user-controller");

// GET all users and create new user
router.route("/").get(getAllUsers).post(createUser);

// Get single user by id, update user by id, and delete user by id.
router.route("/:id").get(getSingleUser).put(updateSingleUser).delete(removeUser);

// add and remove friends w/ userId and friendId.
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
