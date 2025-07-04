"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hypeStatServices = void 0;
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const hypestat_model_1 = require("./hypestat.model");
//save in DB
const saveDataInDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(data === null || data === void 0 ? void 0 : data.domain)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Domain is required');
    }
    const browser = yield puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
        const page = yield browser.newPage();
        yield page.goto(`https://hypestat.com/info/${data.domain}`, {
            waitUntil: 'networkidle2',
            timeout: 60000,
        });
        yield page.waitForSelector('.traffic_sources_report', { timeout: 30000 });
        const trafficSources = yield page.evaluate(() => {
            var _a, _b, _c;
            const container = document.querySelector('.traffic_sources_report');
            if (!container)
                return [];
            const dtElements = container.querySelectorAll('dt');
            const ddElements = container.querySelectorAll('dd');
            const results = [];
            for (let i = 0; i < dtElements.length && i < ddElements.length; i++) {
                const source = ((_a = dtElements[i].textContent) === null || _a === void 0 ? void 0 : _a.replace(':', '').trim()) || '';
                const percentageText = ((_c = (_b = ddElements[i].querySelector('span')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '0%';
                const percentage = parseFloat(percentageText.replace('%', '')) || 0;
                results.push({ source, percentage });
            }
            return results;
        });
        if (!trafficSources || trafficSources.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Traffic sources not found');
        }
        const result = yield hypestat_model_1.ScrappedModel.create({
            domain: data.domain,
            info: trafficSources,
        });
        return result;
    }
    catch (error) {
        console.error('Scraping Error:', error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Scraping failed');
    }
    finally {
        yield browser.close();
    }
});
exports.hypeStatServices = {
    saveDataInDB,
};
