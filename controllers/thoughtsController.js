const { Thoughts, User } = require('../models');

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get one thought 
    getOneThoughtById(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought 
                ? res.status(404).json({ message: 'No thought with that ID!' }) 
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtData._id } },
                { new: true }
                )
             })
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // Update a thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((thought) =>
                !thought 
                ? res.status(404).json({ message: 'No thought with that ID!' }) 
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought 
                ? res.status(404).json({ message: 'No thought with that ID!' }) 
                : User.findOneAndUpdate(
                    { thoughts: req.params.id },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                  )
            )
            .then(() =>
            res.json({ message: 'Thought deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Post a reaction
    postReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No friend found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err))
      },
    // Delete a reaction
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought found with that ID :(' })
                : res.json(thought)
            )
        .catch((err) => res.status(500).json(err))
    },
}