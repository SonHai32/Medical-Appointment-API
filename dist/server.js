"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_shared_1 = require("./shared/constants.shared");
const logger_shared_1 = __importDefault(require("./shared/logger.shared"));
const index_router_1 = __importDefault(require("./routers/index.router"));
const app = (0, express_1.default)();
const { BAD_REQUEST } = http_status_codes_1.default;
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json()), app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(constants_shared_1.cookieProps.secret));
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
app.use("api", index_router_1.default);
app.use((error, req, res, next) => {
    logger_shared_1.default.err(error, true);
    return res.status(BAD_REQUEST).json({
        error: error.message,
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map