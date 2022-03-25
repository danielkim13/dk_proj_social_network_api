const router = require("express").Router();
const { getAllThoughts, createThought } = require("../../controllers/thought-controller");

// get all thoughts and create thought
router.route("/").get(getAllThoughts).post(createThought);

// get single thought, update thought by id, and delete by id.
router.route('/:id').get().put().delete()

module.exports = router;
