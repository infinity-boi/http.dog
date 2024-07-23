import express from 'express';
import { searchCode } from '../controllers/statusDog.controller.js';

const router = express.Router();

router.get('/images/:filter', searchCode);

export default router;
  