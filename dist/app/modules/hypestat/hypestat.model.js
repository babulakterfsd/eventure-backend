"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappedModel = void 0;
const mongoose_1 = require("mongoose");
const scrappedDataSchema = new mongoose_1.Schema({
    domain: {
        type: String,
        required: true,
        trim: true,
    },
    info: [
        {
            source: {
                type: String,
                required: true,
                trim: true,
            },
            percentage: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.ScrappedModel = (0, mongoose_1.model)('scrappedData', scrappedDataSchema);
