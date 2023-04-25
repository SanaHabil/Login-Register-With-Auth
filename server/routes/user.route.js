const UserController = require('../controllers/user.controller')
const {authenticate} = require("../config/jwt.config")

const routes = (app)=>{

    app.post('/api/users/register', UserController.register)
    app.post('/api/users/login', UserController.login)
    app.post('/api/users/logout', UserController.logout)
    app.delete('/api/users/:id', UserController.delete)
    app.get('/api/users', UserController.getLoggedInUser)
    app.get('/api/users/getAllUsers',UserController.getAllUsers)
}

module.exports = routes