"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start");
const server_1 = __importDefault(require("./server"));
const logger_shared_1 = __importDefault(require("./shared/logger.shared"));
const port = Number(process.env.PORT || 3000);
server_1.default.listen(port, () => {
    logger_shared_1.default.info('Server is running on PORT' + port);
});
//# sourceMappingURL=index.js.map