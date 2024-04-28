import express from 'express';
import RestaurantController from '../controllers/RestaurantController';
import { jwtCheck as validateToken, jwtParse as validateAuthenticatedUserInfo } from '../middlewares/auth';
import multer from 'multer';
import { validateRestaurantRequest } from '../middlewares/validation';

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

router.post('/', upload.single('imageFile'), validateRestaurantRequest, validateToken, validateAuthenticatedUserInfo, RestaurantController.createRestaurant)

export default router