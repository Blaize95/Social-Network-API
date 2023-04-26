const router = require('express').Router();
const {
    getOneThoughtById,
    getAllThoughts,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

// insert details about the url here
router.route('/').get(getAllThoughts).post(createThought);

// insert details about the url here
router.route('/:thoughtId').get(getOneThoughtById).put(updateThought).delete(deleteThought);

// insert details about the url here
router.route('/:thoughtId/reactions').post(postReaction);

// insert details about the url here
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
