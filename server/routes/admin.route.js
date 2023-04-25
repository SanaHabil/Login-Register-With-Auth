const AdminController = require('../controllers/admin.controller')
const {authenticate} = require("../config/jwt.config")

const routes = (app)=>{

    app.post('/api/admins/register', AdminController.register)
    app.post('/api/users/login', AdminController.login)
    app.post('/api/users/logout', AdminController.logout)
    
}

module.exports = routes