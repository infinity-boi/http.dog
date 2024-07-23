// List
import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { save, getLists } from '../controllers/list.controller.js';


const router = express.Router();

router.post('/save', protectRoute, save);

router.get('/lists', protectRoute, getLists);

export default router;
