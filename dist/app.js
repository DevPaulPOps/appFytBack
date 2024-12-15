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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const eventsRoutes_1 = __importDefault(require("./event/eventsRoutes"));
const usersRoutes_1 = __importDefault(require("./user/usersRoutes"));
const user_model_1 = __importDefault(require("./user/user.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const { auth } = require('express-oauth2-jwt-bearer');
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const checkJwt = auth({
    audience: 'appFyt-api',
    issuerBaseURL: `https://dev-zyrhjtinowhljm6k.us.auth0.com/`,
});
//app.use(checkJwt);
const uri = 'mongodb+srv://perigaultpaul:juqzam-nedko0-gEzdix@cluster0.flvnwrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose_1.default.connect(uri);
mongoose_1.default.connection.on('connected', () => {
    console.log('connected to database');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(`error connecting to database`, err);
});
app.use('/api', eventsRoutes_1.default);
app.use('/api', usersRoutes_1.default);
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
const updateUsersConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.updateMany({}, { isConnected: false });
        console.log('All users have been automatically disconnected.');
    }
    catch (error) {
        console.error("Error updating users' connection:", error);
    }
});
node_cron_1.default.schedule('0 0 */3 * *', updateUsersConnection);
