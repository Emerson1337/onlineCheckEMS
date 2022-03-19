import { Router } from 'express';
import AuthController from '../useCases/Restaurants/AuthController';
import BestSellingCategoryController from '../useCases/Categories/BestSellingCategoryController';
import BestSellingFoodController from '../useCases/Foods/BestSellingFoodController';
import FoodController from '../useCases/Foods/FoodController';
import FoodTypeController from '../useCases/Categories/FoodTypeController';
import UserController from '../useCases/Restaurants/UsersController';
import MoneyMonthlyController from '../useCases/MonthSales/MoneyMonthlyController';
import MonthSalesController from '../useCases/MonthSales/MonthSalesController';
import RestaurantInfoController from '../useCases/Restaurants/RestaurantInfoController';
import { Auth } from '../middlewares/auth';
import verifyCreateUserValidator from '../middlewares/verifyCreateUserValidator';


const bestSellingCategoryController = new BestSellingCategoryController();
const userController = new UserController();
const foodController = new FoodController();
const foodTypeController = new FoodTypeController();
const monthSalesController = new MonthSalesController();
const moneyMonthlyController = new MoneyMonthlyController();
const bestSellingFoodController = new BestSellingFoodController();
const authController = new AuthController();
const restaurantInfoController = new RestaurantInfoController();

const auth = new Auth();

const router = Router();

//ROTAS DA API
//TRATATIVAS DE USUARIO
router.post('/api/signup', verifyCreateUserValidator, userController.createUser);
router.post('/api/login', userController.login);
router.post('/api/authenticated', auth.authMiddleware, authController.auth);

//CRUD COMIDAS
router.post('/api/create-food', auth.authMiddleware, foodController.handleCreateFood);
router.get('/api/list-foods/:enterprise', foodController.handleListAllFoods);
router.delete('/api/remove-food/:id', auth.authMiddleware, foodController.handleRemoveFood);
router.put('/api/update-food/:id', auth.authMiddleware, foodController.handleEditFood);
router.get('/api/list-by-tag/:id/:enterprise', foodController.listByTag);
router.get('/api/list-top-foods/:enterprise', foodController.listBestMonthSellingFoods);
router.get('/api/best-sold-foods', auth.authMiddleware, bestSellingFoodController.bestSoldFoods);

//ROTAS DE ANALISES GRAFICAS
router.get('/api/dashboard/money-monthly', auth.authMiddleware, moneyMonthlyController.getMoneyMonthly);

//CRIACAO E LISTAGEM DE TAGS DE COMIDAS
router.post('/api/create-tag-food', auth.authMiddleware, foodTypeController.handleCreate);
router.get('/api/list-tags/:enterprise', foodTypeController.handleListAllTags);
router.delete('/api/remove-tag/:id', auth.authMiddleware, foodTypeController.handleRemoveTag);
router.put('/api/update-tag/:id', auth.authMiddleware, foodTypeController.handleEditTag);

// INFORMACOES DO RESTAURANTE
router.post('/api/restaurant-info', auth.authMiddleware, restaurantInfoController.create);
router.get('/api/restaurant-info/:enterprise', restaurantInfoController.listInfo);


//REGISTOR DE NOVA VENDA
router.post('/api/sale', monthSalesController.insertNewSale);
router.get('/api/test', bestSellingCategoryController.calculateBestSellingCategory);


export default router;