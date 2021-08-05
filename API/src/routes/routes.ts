import { Router } from 'express';
import CreateFoodController from '../controllers/CreateFoodController';
import { CreateFoodTypeController } from '../controllers/CreateFoodTypeController';
import CreateUsersController from '../controllers/CreateUsersController';
import { Auth } from '../middlewares/auth';
import verifyCreateUserValidator from '../middlewares/verifyCreateUserValidator';

import i from '../middlewares/verifyCreateUserValidator'



const createUsersController = new CreateUsersController();
const createFoodController = new CreateFoodController();
const createFoodTypeController = new CreateFoodTypeController();

const auth = new Auth();

const router = Router();

//ROTAS DA API
//TRATATIVAS DE USUÁRIO
router.post('/api/signup', verifyCreateUserValidator,  createUsersController.createUser);
router.post('/api/login', createUsersController.login);

//CRUD COMIDAS
router.post('/api/create-food', auth.authMiddleware, createFoodController.handleCreateFood);
router.get('/api/list-foods', auth.authMiddleware, createFoodController.handleListAllFoods);
router.delete('/api/remove-food/:name', auth.authMiddleware, createFoodController.handleRemoveFood);
router.patch('/api/update-food/:nameToEdit', auth.authMiddleware, createFoodController.handleEditFood);

//CRIAÇÃO E LISTAGEM DE TAGS DE COMIDAS
router.post('/api/create-tag-food', auth.authMiddleware, createFoodTypeController.handleCreate);
router.get('/api/list-tags', auth.authMiddleware, createFoodTypeController.handleListAllTags);
router.delete('/api/remove-tag/:name', auth.authMiddleware, createFoodTypeController.handleRemoveTag);
router.patch('/api/update-tag/:tagToEdit', auth.authMiddleware, createFoodTypeController.handleEditTag);


export default router;