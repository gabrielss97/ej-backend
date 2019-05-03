const userController = require('../controllers/user');

module.exports = (app) => {

    app.route('/users')
    .get(userController.allUsers)
    .post(userController.newUser);
}