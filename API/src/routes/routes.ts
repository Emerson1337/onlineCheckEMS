import { Router } from 'express';
import CreateUsersController from '../controllers/CreateUsersController';

const createUsersController = new CreateUsersController();

const router = Router();

//ROTAS DA API
router.post('/api/signup', createUsersController.createUser);


export default router;