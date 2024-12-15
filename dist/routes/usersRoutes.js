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
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.default.Router();
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo } = req.query;
        const user = yield user_model_1.default.findOne({ pseudo });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/user/connection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo } = req.query;
        const user = yield user_model_1.default.findOne({ pseudo });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ isConnected: user.isConnected });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo } = req.body;
        const existingUser = yield user_model_1.default.findOne({ pseudo });
        if (existingUser) {
            if (existingUser.isConnected) {
                return res
                    .status(400)
                    .json({ message: 'Ce pseudo est déjà utilisé par un utilisateur actuellement connecté.' });
            }
            else {
                existingUser.isConnected = true;
                yield existingUser.save();
                return res.status(200).json(existingUser);
            }
        }
        const newUser = yield user_model_1.default.create({ pseudo, isConnected: true });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo } = req.body;
        const user = yield user_model_1.default.findOne({ pseudo });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        user.isConnected = false;
        yield user.save();
        res.json({ message: 'Déconnexion réussie.' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
