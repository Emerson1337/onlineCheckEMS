import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import BestSellingCategoryController from '../controllers/BestSellingCategoryController';
import BestSellingFoodController from '../controllers/BestSellingFoodController';
import CreateFoodController from '../controllers/CreateFoodController';
import { CreateFoodTypeController } from '../controllers/CreateFoodTypeController';
import CreateUsersController from '../controllers/CreateUsersController';
import MoneyMonthlyController from '../controllers/MoneyMonthlyController';
import MonthSalesController from '../controllers/MonthSalesController';
import { Auth } from '../middlewares/auth';
import verifyCreateUserValidator from '../middlewares/verifyCreateUserValidator';
import BestSellingCategory from '../models/BestSellingCategory';


const createUsersController = new CreateUsersController();
const createFoodController = new CreateFoodController();
const createFoodTypeController = new CreateFoodTypeController();
const monthSalesController = new MonthSalesController();
const moneyMonthlyController = new MoneyMonthlyController();
const bestSellingFoodController = new BestSellingFoodController();
const authController = new AuthController();

const auth = new Auth();

const router = Router();

//ROTAS DA API
//TRATATIVAS DE USUARIO
router.post('/api/signup', verifyCreateUserValidator, createUsersController.createUser);
router.post('/api/login', createUsersController.login);
router.post('/api/authenticated', auth.authMiddleware, authController.auth);

//CRUD COMIDAS
router.post('/api/create-food', auth.authMiddleware, createFoodController.handleCreateFood);
router.get('/api/list-foods', createFoodController.handleListAllFoods);
router.delete('/api/remove-food/:id', auth.authMiddleware, createFoodController.handleRemoveFood);
router.put('/api/update-food/:id', auth.authMiddleware, createFoodController.handleEditFood);
router.get('/api/list-by-tag/:id', createFoodController.listByTag);
router.get('/api/list-top-foods', createFoodController.listBestMonthSellingFoods);

//ROTAS DE ANALISES GRAFICAS
router.get('/api/dashboard/money-monthly', moneyMonthlyController.getMoneyMonthly);

//CRIACAO E LISTAGEM DE TAGS DE COMIDAS
router.post('/api/create-tag-food', auth.authMiddleware, createFoodTypeController.handleCreate);
router.get('/api/list-tags', createFoodTypeController.handleListAllTags);
router.delete('/api/remove-tag/:id', auth.authMiddleware, createFoodTypeController.handleRemoveTag);
router.put('/api/update-tag/:id', auth.authMiddleware, createFoodTypeController.handleEditTag);

//REGISTOR DE NOVA VENDA
router.get('/api/sale', monthSalesController.insertNewSale);

//ROTAS DE TESTE
router.get('/api/sale', monthSalesController.insertNewSale);

export default router;