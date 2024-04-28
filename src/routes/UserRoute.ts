import express from 'express';
import UserController from '../controllers/UserController';
import { jwtCheck as validateToken, jwtParse as validateAuthenticatedUserInfo } from '../middlewares/auth';
import { validateUserRequest } from '../middlewares/validation';

const router = express.Router()

router.get('/', validateToken, validateAuthenticatedUserInfo, UserController.getUser)
router.post('/', validateToken, UserController.createUser)
router.put('/', validateUserRequest, validateToken, validateAuthenticatedUserInfo, UserController.updateUser)

export default router