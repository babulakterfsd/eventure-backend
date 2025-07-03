import { Router } from 'express';
import { HypeStatRoutes } from '../modules/hypestat/hypestat.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/hypestat',
    route: HypeStatRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
