const router = require("express").Router();
const { getAllThoughts, createThought, getSingleThought, updateSingleThought, removeThought, addReaction } = require("../../controllers/thought-controller");

// get all thoughts and create thought
router.route("/").get(getAllThoughts).post(createThought);

// get single thought, update thought by id, and delete by id.
router.route("/:id").get(getSingleThought).put(updateSingleThought).delete(removeThought);

// create and delete the reactions through thoughtId
router.route("/:thoughtId/reactions").post(addReaction).delete();

module.exports = router;
