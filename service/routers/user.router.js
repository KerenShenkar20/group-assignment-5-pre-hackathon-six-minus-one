const { Router } = require ('express' );
const {userController} = require ('./controller' );
const {userDbController} = require ('./controllers/user.ctrl');
const userRouter = new Router();

userRouter.get('/', userDbController.getUsers);
userRouter.get('/:id', userDbController.getUser);
userRouter.post('/', userDbController.addUser);
userRouter.put('/:id', userDbController.updateUser);
userRouter.delete('/:id', userDbController.deleteUser);


module.exports = {userRouter};