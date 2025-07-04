"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypeStatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const hypestat_controller_1 = require("./hypestat.controller");
const router = express_1.default.Router();
//save data
router.post('/', hypestat_controller_1.HypeStatControllers.createData);
exports.HypeStatRoutes = router;
