const router = require('express').Router();
const {
    getOneUserById,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend,
} = require('../../controllers/userController');

// insert details about the url here
router.route('/').get(getAllUsers).post(createNewUser);

// insert details about the url here
router.route('/:userId').get(getOneUserById).put(updateUser).delete(deleteUser);

// insert details about the url here
// There is an error with this line of code - working on fix
router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend);

module.exports = router;