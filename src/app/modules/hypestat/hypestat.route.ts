import express from 'express';
import { HypeStatControllers } from './hypestat.controller';

const router = express.Router();

//save data
router.post('/', HypeStatControllers.createData);

export const HypeStatRoutes = router;
