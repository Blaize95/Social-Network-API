const { User, Thoughts } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getOneUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with that ID.' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user found with that ID.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    addUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user found with that ID.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user 
                ? res.status(404).json({ message: 'No user with that ID!' }) 
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) => 
                !user
                ? res.status(404).json({ message: ' No user found with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}