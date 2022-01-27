import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import BestSellingCategoryController from '../controllers/BestSellingCategoryController';
import BestSellingFoodController from '../controllers/BestSellingFoodController';
import CreateFoodController from '../controllers/CreateFoodController';
import { CreateFoodTypeController } from '../controllers/CreateFoodTypeController';
import CreateUsersController from '../controllers/CreateUsersController';
import MoneyMonthlyController from '../controllers/MoneyMonthlyController';
import MonthSalesController from '../controllers/MonthSalesController';
import RestaurantInfoController from '../controllers/RestaurantInfoController';
import { Auth } from '../middlewares/auth';
import verifyCreateUserValidator from '../middlewares/verifyCreateUserValidator';


const bestSellingCategoryController = new BestSellingCategoryController();
const createUsersController = new CreateUsersController();
const createFoodController = new CreateFoodController();
const createFoodTypeController = new CreateFoodTypeController();
const monthSalesController = new MonthSalesController();
const moneyMonthlyController = new MoneyMonthlyController();
const bestSellingFoodController = new BestSellingFoodController();
const authController = new AuthController();
const restaurantInfoController = new RestaurantInfoController();

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
router.get('/api/best-sold-foods', bestSellingFoodController.bestSoldFoods);

//ROTAS DE ANALISES GRAFICAS
router.get('/api/dashboard/money-monthly', moneyMonthlyController.getMoneyMonthly);

//CRIACAO E LISTAGEM DE TAGS DE COMIDAS
router.post('/api/create-tag-food', auth.authMiddleware, createFoodTypeController.handleCreate);
router.get('/api/list-tags', createFoodTypeController.handleListAllTags);
router.delete('/api/remove-tag/:id', auth.authMiddleware, createFoodTypeController.handleRemoveTag);
router.put('/api/update-tag/:id', auth.authMiddleware, createFoodTypeController.handleEditTag);

// INFORMACOES DO RESTAURANTE
router.post('/api/restaurant-info', auth.authMiddleware, restaurantInfoController.create);
router.get('/api/restaurant-info/:id', auth.authMiddleware, restaurantInfoController.create);
router.put('/api/restaurant-info/:id', auth.authMiddleware, restaurantInfoController.update);


//REGISTOR DE NOVA VENDA
router.post('/api/sale', monthSalesController.insertNewSale);
router.get('/api/test', bestSellingCategoryController.calculateBestSellingCategory);


export default router;