"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hypestat_route_1 = require("../modules/hypestat/hypestat.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/hypestat',
        route: hypestat_route_1.HypeStatRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
